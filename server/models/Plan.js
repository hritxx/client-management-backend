// models/Plan.js
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  minInvestment: { type: Number, required: true },
  interestRate: { type: Number, required: true },
});

module.exports = mongoose.model("Plan", planSchema);
