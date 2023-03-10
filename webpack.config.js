const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = (env) => {
    const isDevelopment = Boolean(env.development);
    const basePlugins = [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/template.html',
        }),
    ];
    const plugins = isDevelopment ? basePlugins : [...basePlugins, new BundleAnalyzerPlugin()];
    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: {
            app: path.resolve('src/index.js'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss|css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.m?js$/,
                    exclude: {
                        and: [/node_modules/], // Exclude libraries in node_modules ...
                        not: [
                            // Except for a few of them that needs to be transpiled because they use modern syntax
                            /unfetch/,
                            /d3-array|d3-scale/,
                            /@hapi[\\/]joi-date/,
                        ],
                    },
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        debug: true, // Hi???n th??? debug l??n terminal ????? d??? debug
                                        useBuiltIns: 'entry', // D??ng 'usage' th?? ????n gi???n nh???t, kh??ng c???n import core-js v??o code
                                        // D??ng 'entry' th?? t??? tay import gi??p gi???m dung l?????ng c???a file
                                        corejs: '3.27.2', // n??n quy ?????nh verson core-js ????? babel-preset-env n?? ho???t ?????ng t???i ??u
                                    },
                                ],
                            ],
                        },
                    },
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        devtool: isDevelopment ? 'source-map' : false,
        plugins,
        devServer: {
            static: {
                directory: 'dist', // ???????ng d???n t????ng ?????i ?????n v???i th?? m???c ch???a index.html
            },
            port: 3000, // Port thay cho port m???c ?????nh (8080)
            open: true, // M??? trang webpack khi ch???y terminal
            hot: true, // B???t t??nh n??ng reload nhanh Hot Module Replacement
            compress: true, // B???t Gzip cho c??c t??i nguy??n
            historyApiFallback: true, // Set true n???u b???n d??ng cho c??c SPA v?? s??? d???ng History API c???a HTML5
        },
    };
};
