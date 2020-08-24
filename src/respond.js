export function respond(response, options) {
  const { status, statusCode = status, headers, body, charset, cache } = options
  if (statusCode != null) {
    response.statusCode = statusCode
  }
  if (headers != null) {
    // TODO: Check if headers are iterable
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
