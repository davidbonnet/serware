import { serialize } from "cookie";

export function setCookie(response, name, value, options) {
  if (!response.cookies) {
    response.cookies = [];
  }
  const cookie = serialize(name, value, options);
  response.cookies.push(cookie);
  return cookie;
}
