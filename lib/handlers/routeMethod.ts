export function routeMethod(routes) {
  return async function (request, next) {
    const { method } = request;
    if (!(method in routes)) {
      return await next(request);
    }
    return await routes[method](request, next);
  };
}
