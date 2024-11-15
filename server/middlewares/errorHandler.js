// middlewares/errorHandler.js

// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Set default status code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle specific Mongoose errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors).map((error) => error.message);
    message = `Validation error: ${errors.join(", ")}`;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Resource not found with ID ${err.value}`;
  } else if (err.code === 11000) {
    // Duplicate key error (e.g., unique constraint)
    statusCode = 400;
    const field = Object.keys(err.keyValue);
    message = `Duplicate field value: ${field}. Please use a different value.`;
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;
