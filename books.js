// books.js - Book Management REST API (Port 3001)
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, "books.json");

// Middleware to parse JSON bodies
app.use(express.json());

// Load initial books into memory
let books = [];
try {
  const data = fs.readFileSync(DATA_FILE, "utf8");
  books = JSON.parse(data);
} catch (err) {
  console.error("Error reading books.json:", err.message);
  books = [];
}

// Persistence helper function
function saveBooks() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), "utf8");
}

// Validation helper function
function validateBookInput(body) {
  const { title, author, price } = body;

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof author !== "string" ||
    author.trim() === ""
  ) {
    return {
      isValid: false,
      message: "title and author are required as non-empty strings"
    };
  }

  if (typeof price !== "number" || isNaN(price) || price < 0) {
    return {
      isValid: false,
      message: "price must be a valid number greater than or equal to 0"
    };
  }

  return { isValid: true };
}

// 1. GET /books - Return all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// 2. GET /books/:id - Return a single book by id
app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
});

// 3. POST /books - Add a new book
app.post("/books", (req, res) => {
  const validation = validateBookInput(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  const { title, author, price } = req.body;
  const maxId = books.length > 0 ? Math.max(...books.map((b) => b.id)) : 0;

  const newBook = {
    id: maxId + 1,
    title: title.trim(),
    author: author.trim(),
    price: Number(price)
  };

  books.push(newBook);
  saveBooks();

  res.status(201).json(newBook);
});

// 4. PUT /books/:id - Update an existing book
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const validation = validateBookInput(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  const { title, author, price } = req.body;

  books[bookIndex].title = title.trim();
  books[bookIndex].author = author.trim();
  books[bookIndex].price = Number(price);

  saveBooks();

  res.status(200).json(books[bookIndex]);
});

// 5. DELETE /books/:id - Delete a book by id
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];
  saveBooks();

  res.status(200).json({
    message: "Book deleted successfully",
    book: deletedBook
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Books API running at http://localhost:${PORT}`);
});
