import { orderBy, toPairs } from "lodash-es";

import { setHref } from "../tools/setHref.js";

export function routeUrl(routes) {
  const orderedRoutes = Object.entries(routes).sort(keyDescending);
  return async function (request, next) {
    if (!request.href) {
      setHref(request);
    }
    const { pathname } = request;
    const { length } = orderedRoutes;
    const { length: pathnameLength } = pathname;
    for (let i = 0; i < length; i++) {
      const route = orderedRoutes[i];
      const pattern = route[0];
      if (pattern.length > pathnameLength) {
        continue;
      }
      const handler = route[1];
      if (pattern === pathname || pathname.startsWith(pattern)) {
        request.pathname = pathname.slice(pattern.length);
        return await handler(request, (request) => {
          request.pathname = pathname;
          return next(request);
        });
      }
    }
    return await next(request);
  };
}

function keyDescending(a, b) {
  return b[0].length - a[0].length;
}
