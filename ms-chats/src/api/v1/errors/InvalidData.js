const { StatusCodes } = require("http-status-codes");

class InvalidData extends Error {
  constructor(field) {
    super();
    this.message = "Invalid file type.";
    this.status = StatusCodes.BAD_REQUEST;
    this.name = "InvalidData";
  }
}

module.exports = InvalidData;
