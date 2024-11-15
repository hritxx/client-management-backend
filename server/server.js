// Import required modules
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middlewares/errorHandler");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Connect to MongoDB
connectDB();

// Set up routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Error handling middleware

// Define the PORT from environment variables or use 5000 as a default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
