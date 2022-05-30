import { toObject } from "./toObject.js";

export function withContentType(contentType, body, options = null) {
  return {
    ...options,
    headers: {
      ...(options?.headers != null ? toObject(options.headers) : null),
      "Content-Type": contentType,
    },
    body,
  };
}
