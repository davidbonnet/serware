export async function writeCookies(request, next) {
  const response = await next(request);
  if (response.headersSent) {
    return response;
  }
  const { cookies } = response;
  if (!cookies) {
    return response;
  }
  response.setHeader("Set-Cookie", cookies);
  return response;
}
