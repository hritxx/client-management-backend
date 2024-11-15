// env.js

const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
const loadEnv = () => {
  const envPath = path.resolve(__dirname, "../.env");
  dotenv.config({ path: envPath });
  console.log(`Environment variables loaded from ${envPath}`);
};

module.exports = loadEnv;
