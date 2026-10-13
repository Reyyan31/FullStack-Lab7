// readjson.js - Read and parse students.json
const fs = require("fs");

const fileData = fs.readFileSync("students.json", "utf8");
const students = JSON.parse(fileData);

console.log(students);
console.log(`Number of students: ${students.length}`);
