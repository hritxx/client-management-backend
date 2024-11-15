// routes/authRoutes.js
const express = require("express");
const {
  registerClient,
  login,
  changePassword,
} = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const router = express.Router();

// Register a new client (admin only)

// Login client
router.post("/login", login);

// Change password (client)
router.put("/change-password", authenticateUser, changePassword);

module.exports = router;
