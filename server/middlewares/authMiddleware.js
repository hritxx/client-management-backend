// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify the JWT token and authenticate the user
exports.authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Access denied. Invalid token." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found. Unauthorized access." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Invalid token. Unauthorized access." });
  }
};

exports.authenticateAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};
