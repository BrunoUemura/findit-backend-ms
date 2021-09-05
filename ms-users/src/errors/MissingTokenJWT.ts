import { StatusCodes } from "http-status-codes";

export class MissingTokenJWT extends Error {
  public status: Number;

  constructor() {
    super();
    this.message = `No JWT Token provided.`;
    this.status = StatusCodes.UNAUTHORIZED;
    this.name = "MissingTokenJWT";
  }
}
