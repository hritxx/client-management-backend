// controllers/userController.js
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Plan = require("../models/Plan");

// Get user balance
exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    console.error("Error fetching user balance:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get user transaction history
exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ user: userId }).sort({
      date: -1,
    });
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get current investment plan details
exports.getCurrentPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("investmentPlan");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ plan: user.investmentPlan });
  } catch (error) {
    console.error("Error fetching investment plan:", error);
    res.status(500).json({ error: "Server error" });
  }
};
