// db.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// MongoDB connection string from environment variables
const dbURI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI, {});
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
