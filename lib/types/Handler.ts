import type { Request } from "./Request";
import type { Response } from "./Response";

export type Handler = (
  request: Request,
  next: Handler,
) => Response | Promise<Response>;
