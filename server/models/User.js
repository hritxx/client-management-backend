// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    role: { type: String, enum: ["client", "admin"], default: "client" },
    balance: { type: Number, default: 0 },
    investmentPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
