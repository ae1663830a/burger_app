const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
console.log(newNumbers);

// const person = {
//     name: 'Andrew',
//     age: 20
// };
// const newPerson = {
//     ...person,
//     sex: 'male'
// };
// // Adds new properties (props) to the object.
// console.log(newPerson);
//
//
// const newReference = person;
// // Creates a new link to a created person (same object, but a new reference).
//
// const copyPerson = {
//     ...person
// };
// // Creates a copy of the person (new object).
//

const filter = (someData) => {
    return someData.filter(number => number === 4)
    //filter someData(properties that will be given) and searching for value 4
};
console.log(filter(newNumbers));
// Returns value 4 if found in the newNumbers array.