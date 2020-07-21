export async function writeHeaders(request, next) {
  const response = await next(request)
  response.writeHead(response.statusCode || 200, response.statusMessage || 'OK')
  return response
}
