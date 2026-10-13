# FullStack Lab 07: Node.js, REST APIs & Postman

This repository contains the complete implementation and lab report for **Lab 07: Node.js, REST APIs & Postman**.

---

## 🛠️ Installation & Setup

1. **Install dependencies**:
   ```powershell
   npm install
   # Or if execution policy is restricted:
   npm.cmd install
   ```

---

## 🚀 Running the Lab Exercises

### Part A: Node.js Modules
- Run the math module demonstration:
  ```powershell
  node app.js
  ```

### Part B: File Handling & JSON
- Write names to text file (`students.txt`):
  ```powershell
  node write.js
  ```
- Read from text file (`students.txt`):
  ```powershell
  node read.js
  ```
- Read & parse JSON (`students.json`):
  ```powershell
  node readjson.js
  ```
- Update JSON (run once for your screenshot):
  ```powershell
  node updatejson.js
  ```
- Reset `students.json` back to initial state (3 students):
  ```powershell
  node reset-students.js
  ```

---

## 🌐 Running the REST APIs

### 1. Student REST API (Port 3000)
- **Start the Student API**:
  ```powershell
  node server.js
  ```
- Server URL: `http://localhost:3000`
- Available Endpoints:
  - `GET /students` - Fetch all students
  - `GET /students/department/:department` - Filter students by department (case-insensitive)
  - `GET /students/:id` - Fetch student by ID (returns 404 if not found)
  - `POST /students` - Add student (`name`, `department` required; auto-increments ID, persists to `students.json`)
  - `PUT /students/:id` - Update student details (validates input & persists)
  - `DELETE /students/:id` - Delete student by ID (persists changes)

### 2. Books REST API - Assignment (Port 3001)
- **Start the Books API**:
  ```powershell
  node books.js
  ```
- Server URL: `http://localhost:3001`
- Available Endpoints:
  - `GET /books` - Fetch all books
  - `GET /books/:id` - Fetch book by ID (returns 404 if not found)
  - `POST /books` - Add book (`title`, `author`, `price >= 0` required; auto-increments ID, persists to `books.json`)
  - `PUT /books/:id` - Update book details
  - `DELETE /books/:id` - Delete book by ID
- Reset `books.json` back to initial 3 books if needed:
  ```powershell
  node reset-books.js
  ```

---

## 🧪 In-Lab Tasks

### Task 1: Calculator Module with Division-by-Zero Handling
- Run the demo:
  ```powershell
  node calculator-demo.js
  ```

### Task 2: Employee JSON Management
- Read, display, append new employee, persist, and display updated list:
  ```powershell
  node employees.js
  ```

---

## 🤖 Automated API Self-Test
To test all endpoints (GET, POST, PUT, DELETE, plus 400 and 404 responses) automatically:
```powershell
$s1 = Start-Process node -ArgumentList "server.js" -PassThru
$s2 = Start-Process node -ArgumentList "books.js" -PassThru
Start-Sleep -Seconds 2
try { .\test-api.ps1 } finally { Stop-Process -Id $s1.Id -Force; Stop-Process -Id $s2.Id -Force }
node reset-students.js
node reset-books.js
```

---

## 📄 Lab Report Document
The formatted report is saved as:
- **`Lab07_Report.docx`**

You can regenerate it at any time using:
```powershell
node generate-report.js
```
