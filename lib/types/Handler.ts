import type { Request } from "./Request";
import type { Response } from "./Response";

// export type Handler =
//   | ((request: Request) => Response | Promise<Response>)
//   | ((request: Request, next: Handler) => Response | Promise<Response>);

export interface Handler {
  (request: Request): Response | Promise<Response>;
  (request: Request, next: Handler): Response | Promise<Response>;
}
