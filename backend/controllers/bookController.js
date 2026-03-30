const Book = require("../models/Book");

// ➕ Add Book
const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📚 Get All Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Search Books
const searchBooks = async (req, res) => {
  try {
    const query = req.query.q;

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { language: { $regex: query, $options: "i" } }
      ]
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBook,
  getBooks,
  searchBooks
};