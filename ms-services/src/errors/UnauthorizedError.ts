import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
