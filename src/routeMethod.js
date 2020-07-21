export function routeMethod(routes) {
  return (next) => async (request) => {
    const { method } = request
    if (!(method in routes)) {
      return await next(request)
    }
    return await routes[method](next)(request)
  }
}
