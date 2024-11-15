const { body, validationResult } = require("express-validator");

// Validator for client login
exports.loginValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username should be at least 3 characters long"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for changing password
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

// Validator for client registration
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
