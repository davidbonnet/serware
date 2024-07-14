import { URL } from "url";

export function matchUrl(pattern, groupNames, handler) {
  return function (request, next) {
    if (!request.href) {
      const href = new URL(
        `http://${request.headers["host"] || "localhost"}${request.url}`,
      );
      request.href = href;
      request.pathname = href.pathname;
    }
    const { pathname } = request;
    const match = pattern.exec(pathname);
    if (match == null || match.index !== 0) {
      return next(request);
    }
    if (request.matches == null) {
      request.matches = {};
    }
    const { matches } = request;
    const { length } = groupNames;
    for (let i = 0; i < length; i++) {
      const name = groupNames[i];
      matches[name] = match[i + 1];
    }
    request.pathname = pathname.slice(match[0].length);
    return handler(request, next);
  };
}
