import { URL } from "url";
import type { Handler } from "../types.ts";

export function matchUrl(pattern: RegExp, handler: Handler) {
  return function (
    request: Request & {
      href?: URL;
      pathname?: string;
      matches?: Record<string, string>;
    },
    next: Handler,
  ) {
    if (!request.href) {
      const href = new URL(
        `http://${request.headers.get("host") || "localhost"}${request.url}`,
      );
      request.href = href;
      request.pathname = href.pathname;
    }
    const pathname = request.pathname!;
    const match = pattern.exec(pathname);
    if (match == null || match.index !== 0) {
      return next(request);
    }
    request.matches = { ...request.matches, ...match.groups };
    request.pathname = pathname.slice(match[0].length);
    return handler(request, next);
  };
}
