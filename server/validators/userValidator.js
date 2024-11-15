const { body, param, validationResult } = require("express-validator");

// Validator for updating user information (e.g., name, email, etc.)
exports.updateUserValidator = [
  body("username")
    .optional() // The username is optional since the user might not want to change it
    .isLength({ min: 3 })
    .withMessage("Username should be at least 3 characters long"),
  body("email")
    .optional() // Email is optional
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("investmentPlan")
    .optional() // Investment plan is optional
    .notEmpty()
    .withMessage("Investment plan is required"),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for changing the user's password
exports.changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required")
    .isLength({ min: 6 })
    .withMessage("Current password should be at least 6 characters long"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("New password should be at least 6 characters long"),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for registering a client (user-side registration)
exports.registerClientValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username should be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
  body("investmentPlan").notEmpty().withMessage("Investment plan is required"),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for getting user data (e.g., for dashboard or profile)
exports.getUserValidator = [
  param("userId").isMongoId().withMessage("Invalid user ID format"),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
