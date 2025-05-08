// ----------- Pure and Impure Functions -------------
// // Pre Function. For same input, same output.
// function add( n1, n2) {
//     return n1 + n2;
// };

// console.log(add(1,5));
// console.log(add(12,15));

// // Impure function. Gives different output for the same input
// function addRandom(num1) {
//     return num1 + Math.random();
// }
// console.log(addRandom(2));

// // Impure, bcz it changes a value outside of the function
// let prevResul = 0;
// function addAndUpdate(num1, num2) {
//     const sum = num1 + num2;
//     prevResul = sum;
//     return sum;   
// }   


// --------- Factory Functions --------------

// function caculateTax (amt, tax) {
//     return amt * tax
// }
// const vatAmount = caculateTax(100, 0.19);
// const incomeTax = caculateTax(100, 0.25);

// Lets say we needed these tax rates to be used in different places, we could ofcourse insert it but, we can also create a factory function with those amounts.

// function createTaxCalc(tax) {
//     function caculateTax (amt) {
//         return amt * tax;
//     }
//     return caculateTax; // here we are not returning the result but a pointer or reference to this function. 
// }

// const calculateVatAmount = createTaxCalc(0.19);
// const calcIncomeTaxAmount = createTaxCalc(0.25);

// console.log(calculateVatAmount(100));
// console.log(calcIncomeTaxAmount(100));
let userName = 'Loggged valle';
logSm()
function logSm() {
    console.log(userName);
}



