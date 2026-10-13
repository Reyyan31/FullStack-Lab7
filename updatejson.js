// updatejson.js - Read students.json, add Hassan, write back
// IMPORTANT: Do NOT auto-run; user will run this once manually for their screenshot
const fs = require("fs");

const fileData = fs.readFileSync("students.json", "utf8");
const students = JSON.parse(fileData);

students.push({
  id: 4,
  name: "Hassan",
  department: "BSCS"
});

fs.writeFileSync("students.json", JSON.stringify(students, null, 2), "utf8");
console.log("students.json updated successfully.");
console.log(students);
