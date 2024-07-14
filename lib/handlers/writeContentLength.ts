import { Buffer } from "buffer";

import { isBuffer, isString } from "lodash-es";

const { byteLength } = Buffer;

export async function writeContentLength(request, next) {
  const response = await next(request);
  if (response.headersSent) {
    return response;
  }
  const { body, charset, compress } = response;
  if (body == null) {
    response.setHeader("Content-Length", 0);
    return response;
  }
  if (
    !compress &&
    !response.hasHeader("Content-Length") &&
    (isString(body) || isBuffer(body))
  ) {
    response.setHeader("Content-Length", byteLength(body, charset));
  }
  return response;
}
