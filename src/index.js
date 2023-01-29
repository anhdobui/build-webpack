import 'core-js/modules/es.object.values'
import 'core-js/modules/es.promise'
import './styles/style.css'
const sum = (num1,num2) => num1 + num2
console.log(sum(100,10))

// ES6 Spread Operator
const person = { name: 'Do' }
const personClone = { ...person }
console.log('personClone', personClone)

// ES7 Object.values
console.log('Object.values', Object.values(personClone))

const handle = (time) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(400)
    },time)
})
const main = async () => {
    try{
        const value = await handle()
        console.log(value)
    }catch{
        console.log('co loi')
    }
}
main()