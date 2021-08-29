const { StatusCodes } = require("http-status-codes");

class MissingData extends Error {
  constructor(field) {
    super();
    this.message = `Missing ${field} field on the request body!`;
    this.status = StatusCodes.BAD_REQUEST;
    this.name = "MissingData";
  }
}

module.exports = MissingData;
