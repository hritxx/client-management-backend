// utils/helper.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Generate a hashed password
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare plain text password with hashed password
exports.comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Generate JWT Token
exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};

// Validate email format
exports.isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Generate random password (for initial client setup)
exports.generateRandomPassword = (length = 8) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

// Sanitize user input (basic sanitization)
exports.sanitizeInput = (input) => {
  if (typeof input === "string") {
    return input.trim().replace(/<[^>]*>?/gm, ""); // Remove HTML tags
  }
  return input;
};
