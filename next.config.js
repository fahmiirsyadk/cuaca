const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  env: {
    API_KEY: process.env.API_KEY,
  },
};
