const jwt = require("jsonwebtoken");
const blacklist = require("./handleBlacklist");
const MissingTokenJWT = require("../errors/MissingTokenJWT");
const { StatusCodes } = require("http-status-codes");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new MissingTokenJWT();
    }

    const token = authorization.replace("Bearer", "").trim();
    const tokenInBlacklist = await blacklist.tokenExists(token);

    if (tokenInBlacklist) {
      throw new jwt.JsonWebTokenError("Token invalid due to logout.");
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: error.message });
  }
};
