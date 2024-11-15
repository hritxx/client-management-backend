// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  regNo: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["deposit", "withdrawal"], required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
