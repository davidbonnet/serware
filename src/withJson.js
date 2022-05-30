import { withContentType } from "./withContentType.js";

const { JSON } = global;

export function withJson(body, options = null) {
  return withContentType("text/html", JSON.stringify(body), options);
}
