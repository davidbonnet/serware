import { STATUS_CODES } from "http";

export class HTTPError extends Error {
  constructor(statusCode, message = STATUS_CODES[statusCode]) {
    super(message);
    this.statusCode = statusCode;
  }
}
