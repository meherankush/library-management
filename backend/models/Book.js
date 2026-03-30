const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String
  },
  year: {
    type: Number
  },
  language: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  },
  available: {
    type: Number,
    default: 1
  },
  price: {
    type: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Book", bookSchema);