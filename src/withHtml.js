import { withContentType } from "./withContentType.js";

export function withHtml(body, options = null) {
  return withContentType("text/html", body, options);
}
