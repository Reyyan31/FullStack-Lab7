// generate-report.js - Generates Lab07_Report.docx using docx npm package
const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType
} = require("docx");

function createHeader1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 120 }
  });
}

function createHeader2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 }
  });
}

function createHeader3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 140, after: 60 }
  });
}

function createParagraph(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    spacing: { after: 120, line: 276 }
  });
}

function createCodeBlock(codeText) {
  const lines = codeText.split("\n");
  const paragraphs = lines.map(
    (line) =>
      new Paragraph({
        children: [
          new TextRun({
            text: line.length === 0 ? " " : line,
            font: "Consolas",
            size: 20
          })
        ],
        spacing: { before: 0, after: 0, line: 240 }
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: paragraphs,
            shading: {
              type: ShadingType.CLEAR,
              fill: "F3F4F6"
            },
            margins: {
              top: 120,
              bottom: 120,
              left: 150,
              right: 150
            }
          })
        ]
      })
    ]
  });
}

function createScreenshotPlaceholder(label) {
  return new Paragraph({
    children: [
      new TextRun({
        text: `[INSERT SCREENSHOT: ${label}]`,
        bold: true,
        color: "D97706",
        font: "Consolas",
        size: 20,
        highlight: "yellow"
      })
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 160 }
  });
}

// Read actual source files
const mathJsCode = fs.readFileSync("math.js", "utf8");
const appJsCode = fs.readFileSync("app.js", "utf8");
const writeJsCode = fs.readFileSync("write.js", "utf8");
const readJsCode = fs.readFileSync("read.js", "utf8");
const studentsJsonCode = fs.readFileSync("students.json", "utf8");
const readjsonJsCode = fs.readFileSync("readjson.js", "utf8");
const updatejsonJsCode = fs.readFileSync("updatejson.js", "utf8");
const serverJsCode = fs.readFileSync("server.js", "utf8");
const calculatorJsCode = fs.readFileSync("calculator.js", "utf8");
const calculatorDemoJsCode = fs.readFileSync("calculator-demo.js", "utf8");
const employeesJsonCode = fs.readFileSync("employees.json", "utf8");
const employeesJsCode = fs.readFileSync("employees.js", "utf8");
const booksJsonCode = fs.readFileSync("books.json", "utf8");
const booksJsCode = fs.readFileSync("books.js", "utf8");

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        // 1. TITLE PAGE
        new Paragraph({
          text: "LAB REPORT",
          alignment: AlignmentType.CENTER,
          spacing: { before: 800, after: 100 },
          children: [
            new TextRun({
              text: "LAB REPORT",
              bold: true,
              size: 28,
              color: "4B5563"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 600 },
          children: [
            new TextRun({
              text: "Lab 07: Node.js, REST APIs & Postman",
              bold: true,
              size: 44,
              color: "1E3A8A"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 300, after: 100 },
          children: [
            new TextRun({ text: "Name: ", bold: true, size: 24 }),
            new TextRun({ text: "[YOUR NAME]", size: 24 })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 100 },
          children: [
            new TextRun({ text: "Roll No: ", bold: true, size: 24 }),
            new TextRun({ text: "[ROLL NO]", size: 24 })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 100 },
          children: [
            new TextRun({ text: "Course: ", bold: true, size: 24 }),
            new TextRun({ text: "[COURSE]", size: 24 })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 1200 },
          children: [
            new TextRun({ text: "Date: ", bold: true, size: 24 }),
            new TextRun({ text: new Date().toLocaleDateString(), size: 24 })
          ]
        }),
        new Paragraph({
          pageBreakBefore: true,
          children: []
        }),

        // 2. PART A: MODULES
        createHeader1("Part A: Node.js Modules"),
        createParagraph(
          "In this part, we modularized math operations into a separate CommonJS module (math.js) and imported it into our main execution file (app.js)."
        ),
        createHeader2("1. math.js"),
        createCodeBlock(mathJsCode),
        new Paragraph({ spacing: { after: 100 } }),
        createHeader2("2. app.js"),
        createCodeBlock(appJsCode),
        new Paragraph({ spacing: { after: 100 } }),
        createHeader2("Expected Console Output (node app.js)"),
        createCodeBlock(
          "Addition: 15\nSubtraction: 5\nMultiplication: 50\nDivision: 2"
        ),
        createScreenshotPlaceholder("Terminal output running 'node app.js'"),

        new Paragraph({
          pageBreakBefore: true,
          children: []
        }),

        // 3. PART B: FILE HANDLING
        createHeader1("Part B: File Handling (fs Module & JSON)"),
        createParagraph(
          "This section demonstrates synchronous file writing and reading for plain text and JSON formatted data using Node.js's built-in 'fs' module."
        ),
        createHeader2("1. write.js"),
        createCodeBlock(writeJsCode),
        createHeader2("Expected Output (node write.js)"),
        createCodeBlock("File written successfully."),
        createScreenshotPlaceholder("Terminal output running 'node write.js'"),

        createHeader2("2. read.js"),
        createCodeBlock(readJsCode),
        createHeader2("Expected Output (node read.js)"),
        createCodeBlock("Ali\nAhmed\nSara"),
        createScreenshotPlaceholder("Terminal output running 'node read.js'"),

        createHeader2("3. Initial students.json"),
        createCodeBlock(studentsJsonCode),

        createHeader2("4. readjson.js"),
        createCodeBlock(readjsonJsCode),
        createHeader2("Expected Output (node readjson.js)"),
        createCodeBlock(
          "[\n  { id: 1, name: 'Ali', department: 'BSCS' },\n  { id: 2, name: 'Ahmed', department: 'BSIT' },\n  { id: 3, name: 'Sara', department: 'BSCS' }\n]\nNumber of students: 3"
        ),
        createScreenshotPlaceholder("Terminal output running 'node readjson.js'"),

        createHeader2("5. updatejson.js"),
        createCodeBlock(updatejsonJsCode),
        createHeader2("Expected Output (node updatejson.js)"),
        createCodeBlock(
          "students.json updated successfully.\n[\n  { id: 1, name: 'Ali', department: 'BSCS' },\n  { id: 2, name: 'Ahmed', department: 'BSIT' },\n  { id: 3, name: 'Sara', department: 'BSCS' },\n  { id: 4, name: 'Hassan', department: 'BSCS' }\n]"
        ),
        createScreenshotPlaceholder(
          "Terminal output running 'node updatejson.js' (run once manually)"
        ),

        new Paragraph({
          pageBreakBefore: true,
          children: []
        }),

        // 4. PART D & F: STUDENT API
        createHeader1("Part D & F: Student REST API (server.js)"),
        createParagraph(
          "Below is the complete implementation of the Express-based Student REST API running on port 3000, including validation, auto-increment IDs, proper routing order, and file persistence (Part F)."
        ),
        createCodeBlock(serverJsCode),

        new Paragraph({
          pageBreakBefore: true,
          children: []
        }),

        // 5. PART E: POSTMAN TESTING
        createHeader1("Part E: Postman API Testing"),
        createParagraph(
          "Comprehensive API tests were performed using Postman across all endpoints, covering success, edge case, and failure responses."
        ),

        createHeader2("Test 1: GET All Students"),
        createParagraph("Method & URL: GET http://localhost:3000/students"),
        createParagraph("Expected Status: 200 OK"),
        createScreenshotPlaceholder("POSTMAN: GET http://localhost:3000/students, expected 200 OK"),

        createHeader2("Test 2: GET Single Student by ID"),
        createParagraph("Method & URL: GET http://localhost:3000/students/1"),
        createParagraph("Expected Status: 200 OK"),
        createScreenshotPlaceholder("POSTMAN: GET http://localhost:3000/students/1, expected 200 OK"),

        createHeader2("Test 3: GET Missing Student (404)"),
        createParagraph("Method & URL: GET http://localhost:3000/students/99"),
        createParagraph("Expected Status: 404 Not Found"),
        createScreenshotPlaceholder("POSTMAN: GET http://localhost:3000/students/99, expected 404 Not Found"),

        createHeader2("Test 4: POST Valid Student (201)"),
        createParagraph("Method & URL: POST http://localhost:3000/students"),
        createParagraph('Request Body: { "name": "Fatima", "department": "BSSE" }'),
        createParagraph("Expected Status: 201 Created"),
        createScreenshotPlaceholder("POSTMAN: POST http://localhost:3000/students, expected 201 Created"),

        createHeader2("Test 5: POST Invalid Student (400)"),
        createParagraph("Method & URL: POST http://localhost:3000/students"),
        createParagraph('Request Body: { "name": "Incomplete" }'),
        createParagraph("Expected Status: 400 Bad Request"),
        createScreenshotPlaceholder("POSTMAN: POST http://localhost:3000/students (missing fields), expected 400 Bad Request"),

        createHeader2("Test 6: PUT Update Valid Student (200)"),
        createParagraph("Method & URL: PUT http://localhost:3000/students/1"),
        createParagraph('Request Body: { "name": "Ali Khan", "department": "BSCS" }'),
        createParagraph("Expected Status: 200 OK"),
        createScreenshotPlaceholder("POSTMAN: PUT http://localhost:3000/students/1, expected 200 OK"),

        createHeader2("Test 7: PUT Update Invalid Student (400)"),
        createParagraph("Method & URL: PUT http://localhost:3000/students/1"),
        createParagraph('Request Body: { "name": "", "department": "BSCS" }'),
        createParagraph("Expected Status: 400 Bad Request"),
        createScreenshotPlaceholder("POSTMAN: PUT http://localhost:3000/students/1 (empty name), expected 400 Bad Request"),

        createHeader2("Test 8: DELETE Existing Student (200)"),
        createParagraph("Method & URL: DELETE http://localhost:3000/students/2"),
        createParagraph("Expected Status: 200 OK"),
        createScreenshotPlaceholder("POSTMAN: DELETE http://localhost:3000/students/2, expected 200 OK"),

        createHeader2("Test 9: DELETE Non-existent Student (404)"),
        createParagraph("Method & URL: DELETE http://localhost:3000/students/2"),
        createParagraph("Expected Status: 404 Not Found"),
        createScreenshotPlaceholder("POSTMAN: DELETE http://localhost:3000/students/2 again, expected 404 Not Found"),

        createHeader2("Test 10: GET Students by Department (BSCS)"),
        createParagraph("Method & URL: GET http://localhost:3000/students/department/BSCS"),
        createParagraph("Expected Status: 200 OK"),
        createScreenshotPlaceholder("POSTMAN: GET http://localhost:3000/students/department/BSCS, expected 200 OK"),

        createHeader2("Test 11: GET Students by Department (BSIT)"),
        createParagraph("Method & URL: GET http://localhost:3000/students/department/BSIT"),
        createParagraph("Expected Status: 200 OK (case-insensitive test)"),
        createScreenshotPlaceholder("POSTMAN: GET http://localhost:3000/students/department/BSIT, expected 200 OK"),

        new Paragraph({
          pageBreakBefore: true,
          children: []
        }),

        // 6. TASKS 1 TO 4
        createHeader1("In-Lab Tasks (Tasks 1 to 4)"),
        
        createHeader2("Task 1: Calculator Module with Division by Zero Handling"),
        createParagraph("calculator.js:"),
        createCodeBlock(calculatorJsCode),
        createParagraph("calculator-demo.js:"),
        createCodeBlock(calculatorDemoJsCode),
        createHeader3("Expected Terminal Output (node calculator-demo.js):"),
        createCodeBlock(
          "=== Calculator Demo ===\nAddition: 20 + 4 = 24\nSubtraction: 20 - 4 = 16\nMultiplication: 20 * 4 = 80\nDivision: 20 / 4 = 5\n\nTesting division by zero with try/catch:\nCaught Error: Cannot divide by zero"
        ),
        createScreenshotPlaceholder("Terminal output running 'node calculator-demo.js'"),

        createHeader2("Task 2: Employees File Operations (Read, Add & Persist)"),
        createParagraph("employees.json (initial 5 records):"),
        createCodeBlock(employeesJsonCode),
        createParagraph("employees.js:"),
        createCodeBlock(employeesJsCode),
        createHeader3("Expected Terminal Output (node employees.js):"),
        createCodeBlock(
          "Current Employees:\n[\n  { id: 1, name: 'Zubair', position: 'Software Engineer' },\n  { id: 2, name: 'Fatima', position: 'Product Manager' },\n  { id: 3, name: 'Hamza', position: 'QA Lead' },\n  { id: 4, name: 'Ayesha', position: 'UI/UX Designer' },\n  { id: 5, name: 'Bilal', position: 'DevOps Engineer' }\n]\n\nNew Employee Added: { id: 6, name: 'Mariam', position: 'Backend Developer' }\n\nUpdated Employees List:\n[\n  { id: 1, name: 'Zubair', position: 'Software Engineer' },\n  { id: 2, name: 'Fatima', position: 'Product Manager' },\n  { id: 3, name: 'Hamza', position: 'QA Lead' },\n  { id: 4, name: 'Ayesha', position: 'UI/UX Designer' },\n  { id: 5, name: 'Bilal', position: 'DevOps Engineer' },\n  { id: 6, name: 'Mariam', position: 'Backend Developer' }\n]"
        ),
        createScreenshotPlaceholder("Terminal output running 'node employees.js'"),

        createHeader2("Tasks 3 & 4: Department Filtering and Input Validation"),
        createParagraph(
          "Tasks 3 and 4 were implemented and verified directly within the Student REST API (server.js):\n- Task 3: Filtering students by department with case-insensitivity at GET /students/department/:department\n- Task 4: Input validation returning status 400 Bad Request when required fields are missing or empty."
        ),

        new Paragraph({
          pageBreakBefore: true,
          children: []
        }),

        // 7. ASSIGNMENT: BOOKS REST API
        createHeader1("Assignment: Book Management REST API"),
        createParagraph(
          "A dedicated RESTful API for Book Management was created in books.js running on port 3001 with full CRUD operations, input validation, auto-increment IDs, and file persistence (books.json)."
        ),
        createHeader2("1. books.json"),
        createCodeBlock(booksJsonCode),
        new Paragraph({ spacing: { after: 100 } }),
        createHeader2("2. books.js"),
        createCodeBlock(booksJsCode),

        createHeader2("Books API Postman Test Placeholders:"),
        createScreenshotPlaceholder("POSTMAN: GET http://localhost:3001/books, expected 200 OK"),
        createScreenshotPlaceholder("POSTMAN: GET http://localhost:3001/books/1, expected 200 OK"),
        createScreenshotPlaceholder("POSTMAN: GET http://localhost:3001/books/999, expected 404 Not Found"),
        createScreenshotPlaceholder("POSTMAN: POST http://localhost:3001/books (valid), expected 201 Created"),
        createScreenshotPlaceholder("POSTMAN: POST http://localhost:3001/books (negative price), expected 400 Bad Request"),
        createScreenshotPlaceholder("POSTMAN: PUT http://localhost:3001/books/2 (valid update), expected 200 OK"),
        createScreenshotPlaceholder("POSTMAN: DELETE http://localhost:3001/books/3, expected 200 OK"),

        new Paragraph({
          pageBreakBefore: true,
          children: []
        }),

        // 8. CONCLUSION
        createHeader1("Conclusion"),
        createParagraph(
          "Through this laboratory work, we established a foundational understanding of building modular backend applications using Node.js and CommonJS architecture. We gained practical experience reading and writing data synchronously with the built-in fs module, manipulating in-memory JSON representations and persisting changes back to disk. Furthermore, we designed and implemented RESTful API web services with Express.js supporting complete CRUD operations alongside robust client-side input validation and error handling. Finally, we learned how to systematically test and verify HTTP status codes and responses across varied API endpoints using Postman and automated test scripts."
        )
      ]
    }
  ]
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Lab07_Report.docx", buffer);
  console.log("Lab07_Report.docx successfully generated!");
});
