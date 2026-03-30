const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


// Load env
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

// DB connection
const connectDB = require("./config/db");

// Initialize app
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const bookRoutes = require("./routes/bookRoutes");

app.use("/api/books", bookRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});