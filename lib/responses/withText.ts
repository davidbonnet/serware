import { withContentType } from "./withContentType.js";

export function withText(body, options = null) {
  return withContentType("text/plain", body, options);
}
