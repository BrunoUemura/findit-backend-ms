import { CustomError } from "./CustomError";
import { StatusCodes } from "http-status-codes";

export class DatabaseConnectionError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  reason = "Error connecting to database";

  constructor() {
    super("Error connecting to database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
