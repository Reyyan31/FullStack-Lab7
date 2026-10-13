// reset-students.js - Reset students.json back to original 3 students
const fs = require("fs");

const initialStudents = [
  { id: 1, name: "Ali", department: "BSCS" },
  { id: 2, name: "Ahmed", department: "BSIT" },
  { id: 3, name: "Sara", department: "BSCS" }
];

fs.writeFileSync("students.json", JSON.stringify(initialStudents, null, 2), "utf8");
console.log("students.json has been reset to original 3 students.");
