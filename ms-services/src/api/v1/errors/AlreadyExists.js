const { StatusCodes } = require("http-status-codes");

class AlreadyExists extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.status = StatusCodes.BAD_REQUEST;
    this.name = "AlreadyExists";
  }
}

module.exports = AlreadyExists;
