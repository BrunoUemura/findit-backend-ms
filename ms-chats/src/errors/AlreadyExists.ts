import { StatusCodes } from "http-status-codes";

export class AlreadyExists extends Error {
  public status: number;

  constructor(message: string) {
    super();
    this.message = message;
    this.status = StatusCodes.BAD_REQUEST;
    this.name = "AlreadyExists";
  }
}
