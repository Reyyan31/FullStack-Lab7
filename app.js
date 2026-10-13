// app.js - Import math module and test operations

const { add, subtract, multiply, divide } = require("./math");

const a = 10;
const b = 5;

console.log(`Addition: ${add(a, b)}`);
console.log(`Subtraction: ${subtract(a, b)}`);
console.log(`Multiplication: ${multiply(a, b)}`);
console.log(`Division: ${divide(a, b)}`);