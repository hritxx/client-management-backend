const { body, param, validationResult } = require("express-validator");

// Validator for registering a client
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

// Validator for adding a transaction (deposit or withdrawal)
exports.transactionValidator = [
  body("clientId").isMongoId().withMessage("Invalid client ID format"),
  body("type")
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["deposit", "withdrawal"])
    .withMessage("Transaction type must be either 'deposit' or 'withdrawal'"),
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than zero"),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for updating a client's investment plan
exports.updateInvestmentPlanValidator = [
  param("clientId").isMongoId().withMessage("Invalid client ID format"),
  body("newInvestmentPlan")
    .notEmpty()
    .withMessage("New investment plan is required"),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
