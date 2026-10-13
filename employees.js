// employees.js - In-lab Task 2: Read, display, add an employee, persist, and display updated list
const fs = require("fs");

const DATA_FILE = "employees.json";

// 1. Read the employees.json file
const rawData = fs.readFileSync(DATA_FILE, "utf8");
const employees = JSON.parse(rawData);

console.log("Current Employees:");
console.log(employees);

// 2. Add one new employee (id = max id + 1)
const maxId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) : 0;
const newEmployee = {
  id: maxId + 1,
  name: "Mariam",
  position: "Backend Developer"
};

employees.push(newEmployee);

// 3. Write updated array back to file
fs.writeFileSync(DATA_FILE, JSON.stringify(employees, null, 2), "utf8");

// 4. Print the result
console.log("\nNew Employee Added:", newEmployee);
console.log("\nUpdated Employees List:");
console.log(employees);
