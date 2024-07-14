import { getAcceptedEncoding } from "../getAcceptedEncoding.js";

export async function writeContentEncoding(request, next) {
  const acceptedEncoding = getAcceptedEncoding(
    request.headers["accept-encoding"],
  );
  const response = await next(request);
  if (response.headersSent) {
    return response;
  }
  if (
    acceptedEncoding &&
    !response.hasHeader("Content-Encoding") &&
    response.compress
  ) {
    response.setHeader("Content-Encoding", acceptedEncoding);
    return response;
  }
  if (response.compress) {
    response.compress = false;
  }
  return response;
}
