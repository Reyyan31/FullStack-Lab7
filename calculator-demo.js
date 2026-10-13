// calculator-demo.js - Test and demonstrate calculator module with error handling
const { add, subtract, multiply, divide } = require("./calculator");

console.log("=== Calculator Demo ===");
console.log(`Addition: 20 + 4 = ${add(20, 4)}`);
console.log(`Subtraction: 20 - 4 = ${subtract(20, 4)}`);
console.log(`Multiplication: 20 * 4 = ${multiply(20, 4)}`);
console.log(`Division: 20 / 4 = ${divide(20, 4)}`);

// Demonstrating divide-by-zero error handling
console.log("\nTesting division by zero with try/catch:");
try {
  divide(20, 0);
} catch (error) {
  console.log(`Caught Error: ${error.message}`);
}
