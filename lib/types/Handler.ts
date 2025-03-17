import type { Request } from "./Request.ts";
import type { Response } from "./Response.ts";

export interface Handler {
  (request: Request): Response | Promise<Response>;
  (request: Request, next: Handler): Response | Promise<Response>;
}
