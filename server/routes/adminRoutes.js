// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  addTransaction,
  registerClient,
  updateInvestmentPlan,
  getClientDetails, // Fetch client details (optional, for verifying client data)
} = require("../controllers/adminController");
const {
  authenticateAdmin,
  authenticateUser,
} = require("../middlewares/authMiddleware");

// Register a new client (admin only)
router.post(
  "/register-client",
  authenticateUser,
  authenticateAdmin,
  registerClient
);

// Add a new transaction (deposit/withdrawal) for a client
router.post(
  "/transaction",
  authenticateUser,
  authenticateAdmin,
  addTransaction
);

// Update a client's investment plan
router.put(
  "/update-plan",
  authenticateUser,
  authenticateAdmin,
  updateInvestmentPlan
);

// Fetch client details (to view all transactions, balances, etc.)
router.get(
  "/client-details",
  authenticateUser,
  authenticateAdmin,
  getClientDetails
);

module.exports = router;
