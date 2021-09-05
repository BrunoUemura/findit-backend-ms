import { StatusCodes } from "http-status-codes";

export class InvalidData extends Error {
  public status: number;

  constructor() {
    super();
    this.message = "Invalid file type.";
    this.status = StatusCodes.BAD_REQUEST;
    this.name = "InvalidData";
  }
}
