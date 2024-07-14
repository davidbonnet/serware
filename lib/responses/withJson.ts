import { withContentType } from "./withContentType.js";

const { JSON } = global;

export function withJson(body, options = null) {
  return withContentType("application/json", JSON.stringify(body), options);
}
