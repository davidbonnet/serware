export function log({ request: logRequest, response: logResponse }) {
  return async function (request, next) {
    const payload = logRequest ? await logRequest(request) : undefined;
    const response = await next(request);
    if (logResponse) {
      await logResponse(response, payload);
    }
    return response;
  };
}
