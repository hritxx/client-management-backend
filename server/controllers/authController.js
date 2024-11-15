// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { sendEmail } = require("../utils/sendEmail");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register a new client (admin only)
exports.registerClient = async (req, res) => {
  try {
    const { username, regNo, email, password, investmentPlan } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
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

// Login client
exports.login = async (req, res) => {
  try {
    const { regNo, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ regNo });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Server error" });
  }
};
