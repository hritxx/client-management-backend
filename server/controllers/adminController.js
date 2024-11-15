// controllers/adminController.js
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const bcrypt = require("bcryptjs");

// Register a new client
exports.registerClient = async (req, res) => {
  try {
    const { username, regNo, email, password, investmentPlan } = req.body;

    // Validate inputs and check if user exists already
    const existingUser = await User.findOne({ regNo });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      regNo,
      email,
      password: hashedPassword,
      role: "client",
      investmentPlan,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Client registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering client:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new transaction (deposit/withdrawal)
exports.addTransaction = async (req, res) => {
  try {
    const { regNo, type, amount } = req.body;

    // Validate transaction type and amount
    if (!["deposit", "withdrawal"].includes(type)) {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    const client = await User.findOne({ regNo });
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Create and save the transaction
    const transaction = new Transaction({
      user: client._id,
      regNo: client.regNo,
      type,
      amount,
      date: new Date(),
    });

    await transaction.save();

    // Update the client's balance after transaction
    if (type === "deposit") {
      client.balance += amount;
    } else if (type === "withdrawal" && client.balance >= amount) {
      client.balance -= amount;
    } else {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Add the transaction ID to the client's transactions array
    client.transactions.push({ _id: transaction._id });
    await client.save();

    res
      .status(200)
      .json({ message: "Transaction added successfully", transaction });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a client's investment plan
exports.updateInvestmentPlan = async (req, res) => {
  try {
    const { regNo, newInvestmentPlan } = req.body;

    const client = await User.findOne(regNo);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Update the investment plan
    client.investmentPlan = newInvestmentPlan;
    await client.save();

    res
      .status(200)
      .json({ message: "Investment plan updated successfully", client });
  } catch (error) {
    console.error("Error updating investment plan:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch client details (optional)
// Fetch client details (optional)
exports.getClientDetails = async (req, res) => {
  try {
    const { regNo } = req.body;

    // Find the client by regNo
    const client = await User.findOne({ regNo })
      .populate("transactions")
      .select("-password");
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ client });
  } catch (error) {
    console.error("Error fetching client details:", error);
    res.status(500).json({ error: "Server error" });
  }
};
