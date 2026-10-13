// reset-books.js - Reset books.json back to original 3 books
const fs = require("fs");

const initialBooks = [
  {
    id: 1,
    title: "Introduction to Programming",
    author: "John Smith",
    price: 1500
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 2800
  },
  {
    id: 3,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    price: 2200
  }
];

fs.writeFileSync("books.json", JSON.stringify(initialBooks, null, 2), "utf8");
console.log("books.json has been reset to original 3 books.");
