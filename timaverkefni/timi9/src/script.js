// foo = null
// console.log(foo)
// const firstFunction = () => {
//     foo = 'bar'
//     // foo is 'bar' in this scope
//     console.log(foo, 1)
//     const secondFunction = () => {
//         foo = 10
//         // foo is 10 in this scope
//         console.log(foo, 2)
//     }
//     secondFunction()
// }
// firstFunction()
// // foo is not defined in this scope
// console.log('foo outside', foo)
const foo = 10 + '10'// => '10' + '10' => '1010'
console.log(foo)
console.log(typeof foo)
console.log(10 == '10', '==') // => '10' == '10' => true
console.log(10 === '10', '===')

const numberOrNull = 0

const firstObject = {
    foo: 10,
    bar: 20
}
const firstArray = []

if (true) {
    console.log(1)
}

if (10) {
    console.log('10 is truthy')
}

if (1) {
    console.log('1 is truthy')
}
if (-1) {
    console.log('-1 is truthy')
}

if (Number.isInteger(numberOrNull)) {
    console.log('0 is truthy')
}

if (firstArray) {
    console.log('array is truthy')
}

if (firstArray.length > 0) {
    console.log('array has some values')
}

if (firstObject) {
    console.log('obejct is truthy')
}

if (Object.keys(firstObject).length) {
    console.log('object has keys', Object.keys(firstObject))
}

if (Object.entries(firstObject).length) {
    console.log('object has entries', Object.entries(firstObject))
}

if (Object.values(firstObject).length) {
    console.log('object has values', Object.values(firstObject))
}

const gunnsteinn = {
    age: 20,
}
// console.log(Object.entries(gunnsteinn))

gunnsteinn.hairColor = 'dark'


const herdis = gunnsteinn

herdis.hairColor = 'red'

console.log('comparing objects', gunnsteinn === herdis)


const students = ['a', 'b', 'c']

const teachers = students
teachers.pop()
teachers.push('d')
console.log(teachers)
console.log(students === teachers)

// const myConstantFunction = function (paramOne, paramTwo) {
//     console.log('paramOne', paramOne)
//     console.log('paramTwo', paramTwo)

//     return paramOne + paramTwo
// }

const myConstantFunction = (paramOne, paramTwo) => {
    console.log(this)
    console.log('paramOne', paramOne)
    console.log('paramTwo', paramTwo)

    return paramOne + paramTwo
}

const result = myConstantFunction(10, 20)

console.log(result)


function myFirstFunctionTwo(paramOne, paramTwo) {
    console.log(this)
    console.log('paramOne', paramOne)
    console.log('paramTwo', paramTwo)

    return paramOne * paramTwo
}

const calcSum = numberOne => numberOne * 2


console.log(calcSum(10, 15)) // 25

// camelCase
// PascalCase
// snake_case
// kebab-case
// "CONSTANT_CASE"
const person = {
    eyeColor: 'brown',
    'eye-color': 'brown',
    brother: {
        eyeColor: 'green',
        child: {
            eyeColor: 'blue'
        }
    },
    sister: {
        eyeColor: 'green',
    },
    fingerCount: Number.NaN,
}
console.log(person)
delete person['eye-color']


person.height = '180cm'
console.log(person)

console.log('sister', person.sister?.eyeColor)
// =>  shorthand for
// if ('sister' in person) {
//     console.log('sister in person')
//     if ('eyeColor' in person.sister) {
//         console.log('eyeColor in sister')
//         console.log(person.sister.eyeColor)
//     }
// }


const myArray = [person, 2, 3, 4, 5, 6, 7, undefined, undefined]
person['sister']
myArray[50] = 100
console.log(myArray)

const counterElement = document.getElementById('counter')
const updateCounter = () => {
    const counterValue = counterElement.innerHTML
    console.log(counterValue)
    counterElement.innerHTML = Number(counterValue) + 1
}

updateCounter()