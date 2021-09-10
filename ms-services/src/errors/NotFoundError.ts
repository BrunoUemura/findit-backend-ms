import { StatusCodes } from "http-status-codes";
import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
