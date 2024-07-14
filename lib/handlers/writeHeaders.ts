import { STATUS_CODES } from "http";

export async function writeHeaders(request, next) {
  const response = await next(request);
  if (response.headersSent) {
    // TODO: Raise error?
    return response;
  }
  const statusCode = response.statusCode || 200;
  response.writeHead(
    statusCode,
    response.statusMessage || STATUS_CODES[statusCode] || "",
  );
  return response;
}
