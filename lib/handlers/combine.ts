import type { Handler, Request } from "../types";

const { Response } = globalThis;

/* eslint-disable func-names, prefer-arrow-callback */
export function combine(...handlers: Handler[]): Handler {
  return function (request, next) {
    function dispatch(request: Request, index: number) {
      const handler = handlers[index];
      if (!handler) {
        return next(request, respond);
      }
      const result = handler(request, function (request) {
        return dispatch(request, index + 1);
      });
      if (result == null) {
        throw new Error("Handler did not return response");
      }
      return result;
    }
    return dispatch(request, 0);
  };
}

function respond() {
  return new Response();
}
