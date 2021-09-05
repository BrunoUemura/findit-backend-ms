import { StatusCodes } from "http-status-codes";

export class NotFound extends Error {
  public status: number;

  constructor(content: string) {
    super();
    this.message = `${content} not found.`;
    this.status = StatusCodes.BAD_REQUEST;
    this.name = "NotFound";
  }
}
