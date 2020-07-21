export function writeHeaders(next) {
  return async (request) => {
    const response = await next(request)
    response.writeHead(
      response.statusCode || 200,
      response.statusMessage || 'OK',
    )
    return response
  }
}
