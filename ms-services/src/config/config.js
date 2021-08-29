require("dotenv").config();
module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DEFAULT_DB,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  ssl: { rejectUnauthorized: false },
  logging: false,
};
