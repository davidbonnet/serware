export function middleware(next) {
  return async (request, response) => {
    request.response = response
    const nextResponse = await next(async () => response)(request)
    if (!nextResponse.writableEnded) {
      nextResponse.end()
    }
  }
}
