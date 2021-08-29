const blacklist = require("../../../config/redis");
const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");

const { promisify } = require("util");
const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);
const quitRedis = promisify(blacklist.quit).bind(blacklist);

function hashfyToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

module.exports = {
  add: async (token) => {
    const { exp } = jwt.decode(token);
    const tokenHash = hashfyToken(token);
    await setAsync(tokenHash, "");
    blacklist.expireat(token, exp);
  },
  tokenExists: async (token) => {
    const tokenHash = hashfyToken(token);
    const result = await existsAsync(tokenHash);
    return result === 1;
  },
  quit: async () => {
    await quitRedis();
  },
};
