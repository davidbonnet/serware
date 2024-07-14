/* eslint-disable func-names, prefer-arrow-callback */
export function combine(...handlers) {
  return function (request, next) {
    function dispatch(request, index) {
      const handler = handlers[index];
      if (!handler) {
        return next(request, request.respond);
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
