const express = require("express");
const router = express.Router();

const Book = require("../models/Book");

const {
  addBook,
  getBooks,
  searchBooks
} = require("../controllers/bookController");

// Routes
router.post("/add", addBook);
router.get("/", getBooks);
router.get("/search", searchBooks);

// ✅ DELETE ALL FIRST
router.delete("/delete-all", async (req, res) => {
  try {
    await Book.deleteMany({});
    res.json({ message: "All books deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ THEN DELETE BY ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;