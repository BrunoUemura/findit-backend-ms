import { StatusCodes } from "http-status-codes";

export class MissingData extends Error {
  public status: number;

  constructor(field) {
    super(`Missing ${field} field on the request body!`);
    this.status = StatusCodes.BAD_REQUEST;
    this.name = "MissingData";
  }
}
