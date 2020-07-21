export function middleware(next) {
  return async (request, response) => {
    request.respond = function (options) {
      if (options == null) {
        return response
      }
      if (options.respond != null) {
        return options.respond()
      }
      const { headers, body, charset, cache } = options
      if (headers != null) {
        for (const name in headers) {
          response.setHeader(name, headers[name])
        }
      }
      if (body != null) {
        response.body = body
      }
      if (charset !== undefined) {
        response.charset = charset
      }
      if (cache !== undefined) {
        response.cache = cache
      }
      return response
    }
    const message = await next(request, request.respond)
    if (!message.writableEnded) {
      message.end()
    }
  }
}
