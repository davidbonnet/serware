import type { Handler, Request } from "../types";

export function branch(
  condition: (request: Request) => Promise<boolean> | boolean,
  left: Handler,
  right = identity,
) {
  return async function (request: Request, next: Handler) {
    return await ((await condition(request)) ? left : right)(request, next);
  };
}

function identity(request: Request, next: Handler) {
  return next(request, next);
}
