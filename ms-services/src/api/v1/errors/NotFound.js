const { StatusCodes } = require("http-status-codes");

class NotFound extends Error {
  constructor(content) {
    super();
    this.message = `${content} not found.`;
    this.status = StatusCodes.NOT_FOUND;
    this.name = "NotFound";
  }
}

module.exports = NotFound;
