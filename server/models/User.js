// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    adhaarNo: { type: String, required: true, unique: true },
    panNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
      required: true,
    },
    balance: { type: Number, default: 0 },
    investmentPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
