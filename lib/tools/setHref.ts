import { URL } from "url";

export function setHref(request, secure = false, host = "localhost") {
  if (request.href) {
    return request.href;
  }
  const href = new URL(
    `http${secure ? "s" : ""}://${request.headers["host"] || host}${
      request.url
    }`,
  );
  request.href = href;
  request.pathname = href.pathname;
  return href;
}
