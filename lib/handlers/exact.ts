import type { Handler } from "../types.js";
import { branch } from "./branch.js";

/**
 * Ensures that the provided `handler` handles the exact URL.
 *
 * @param handler The handler.
 * @returns A handler.
 */
export function exact(handler: Handler) {
  return branch((request) => !request.pathname, handler);
}
