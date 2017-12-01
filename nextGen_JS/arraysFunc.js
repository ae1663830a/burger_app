const arNumbers = [1, 2, 3];
[num1, , num3] = arNumbers;
console.log(num1, num3);

const doubleNumbers = arNumbers.map((number) => {
    return number * 2;
});
// Map function takes each value of the array and during return we double it.
console.log(doubleNumbers);