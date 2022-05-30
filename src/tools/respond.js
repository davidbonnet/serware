export function respond(
  response,
  { status, statusCode = status, headers, body, charset },
) {
  if (statusCode != null) {
    response.statusCode = statusCode;
  }
  if (headers != null) {
    if (typeof headers.entries === "function") {
      for (const value of headers.entries()) {
        if (value[1] == null) {
          continue;
        }
        response.setHeader(value[0], value[1]);
      }
    } else {
      for (const name in headers) {
        const value = headers[name];
        if (value == null) {
          continue;
        }
        response.setHeader(name, headers[name]);
      }
    }
  }
  if (body != null) {
    response.body = body;
  }
  if (charset !== undefined) {
    response.charset = charset;
  }
  return response;
}
