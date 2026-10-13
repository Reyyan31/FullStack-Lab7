// write.js - Write names to students.txt using fs.writeFileSync
const fs = require("fs");

const content = "Ali\nAhmed\nSara";

fs.writeFileSync("students.txt", content, "utf8");
console.log("File written successfully.");
