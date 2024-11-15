// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getBalance,
  getTransactionHistory,
  getCurrentPlan,
} = require("../controllers/userController");
const { authenticateUser } = require("../middlewares/authMiddleware");

// Get user balance
router.get("/balance", authenticateUser, getBalance);

// Get all transactions (deposits and withdrawals)
router.get("/transactions", authenticateUser, getTransactionHistory);

// Get current investment plan details
router.get("/current-plan", authenticateUser, getCurrentPlan);

module.exports = router;
