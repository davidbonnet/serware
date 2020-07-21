export function compose(...middlewares) {
  return function (request, next) {
    function dispatch(request, index) {
      const middleware = middlewares[index]
      if (!middleware) {
        return next(request, request.respond)
      }
      return middleware(request, function (request) {
        return dispatch(request, index + 1)
      })
    }
    return dispatch(request, 0)
  }
}
