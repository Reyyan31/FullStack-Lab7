// server.js - Student REST API for Lab 07 (Port 3000)
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "students.json");

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Load initial students into memory
let students = [];
try {
  const data = fs.readFileSync(DATA_FILE, "utf8");
  students = JSON.parse(data);
} catch (err) {
  console.error("Error reading initial students data:", err.message);
  students = [];
}

// Helper function to persist changes back to students.json
function saveStudents() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2), "utf8");
}

// 1. GET /students - Return all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// IMPORTANT ROUTE ORDER:
// Specific route "/students/department/:department" MUST be defined before "/students/:id"
// Otherwise ":id" route would treat "department" as an ID param and fail/override it.

// 2. GET /students/department/:department - Case-insensitive filter by department
app.get("/students/department/:department", (req, res) => {
  const targetDept = req.params.department.trim().toLowerCase();
  const filtered = students.filter(
    (s) => s.department && s.department.trim().toLowerCase() === targetDept
  );
  res.status(200).json(filtered);
});

// 3. GET /students/:id - Return a single student by numeric id
app.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// 4. POST /students - Create a new student with validation & auto-increment id
app.post("/students", (req, res) => {
  const { name, department } = req.body;

  // Validation: name and department must be non-empty strings (after trim)
  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof department !== "string" ||
    department.trim() === ""
  ) {
    return res.status(400).json({
      message: "name and department are required as non-empty strings"
    });
  }

  // Calculate new ID = max existing id + 1 (or 1 if list is empty)
  const maxId = students.length > 0 ? Math.max(...students.map((s) => s.id)) : 0;
  const newStudent = {
    id: maxId + 1,
    name: name.trim(),
    department: department.trim()
  };

  students.push(newStudent);
  saveStudents();

  res.status(201).json(newStudent);
});

// 5. PUT /students/:id - Update an existing student's name and department
app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, department } = req.body;

  // Validation: name and department must be non-empty strings (after trim)
  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof department !== "string" ||
    department.trim() === ""
  ) {
    return res.status(400).json({
      message: "name and department are required as non-empty strings"
    });
  }

  students[studentIndex].name = name.trim();
  students[studentIndex].department = department.trim();
  saveStudents();

  res.status(200).json(students[studentIndex]);
});

// 6. DELETE /students/:id - Delete student by id
app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];
  saveStudents();

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
