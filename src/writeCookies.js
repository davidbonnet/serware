export async function writeCookies(request, next) {
  const response = await next(request)
  const { cookies } = response
  if (!cookies) {
    return response
  }
  response.setHeader('set-cookie', cookies)
  return response
}
