export function respond(response, options) {
  const { status, statusCode = status, headers, body, charset, cache } = options
  if (statusCode != null) {
    response.statusCode = statusCode
  }
  if (headers != null) {
    if (typeof headers.entries === 'function') {
      for (const value of headers.entries()) {
        response.setHeader(value[0], headers[value[1]])
      }
    } else {
      for (const name in headers) {
        response.setHeader(name, headers[name])
      }
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
