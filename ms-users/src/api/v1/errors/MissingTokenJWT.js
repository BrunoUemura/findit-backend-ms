const { StatusCodes } = require("http-status-codes");

class MissingTokenJWT extends Error {
  constructor() {
    super();
    this.message = `No JWT Token provided.`;
    this.status = StatusCodes.UNAUTHORIZED;
    this.name = "MissingTokenJWT";
  }
}

module.exports = MissingTokenJWT;
