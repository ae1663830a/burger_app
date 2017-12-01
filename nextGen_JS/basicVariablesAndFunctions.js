function myOld(name) {
    console.log(name);
}

let name = 'Andrew'; // can be reassigned
const number = 5; // cannot be reassigned
myOld(name);

const myFunc = (name) => {
    console.log(name);
};
myFunc(name);

const multiply = (number) => {
    return number * 4;
};
console.log(multiply(number));

const shortMultiply = number => number * 6;
// name of function = parameters => return statement

console.log(shortMultiply(number));
// console.log(function(parameters))

console.log(name + ' ' + number * 5);