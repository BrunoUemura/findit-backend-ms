const redis = require("redis");
require("dotenv").config();

module.exports = redis.createClient({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASS,
  no_ready_check: true,
  prefix: "blacklist:",
});
