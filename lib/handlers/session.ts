import { randomBytes } from "./tools/randomBytes.js";
import { getCookies } from "./getCookies.js";
import { setCookie } from "./setCookie.js";
import { getNow } from "./getNow.js";

export function session({
  store,
  name = "session",
  maxAge = 7 * DAYS,
  secure,
  sameSite = "lax",
  domain,
  path = "/",
  generateKey = defaultGenerateKey,
}) {
  return async function (request, next) {
    const cookies = getCookies(request);
    let key = cookies[name];
    const session = key ? await store.get(key) : null;
    if (key && session == null) {
      key = undefined;
    }
    request.session = session;
    const response = await next(request);
    if (request.session) {
      if (response.refreshSession && key) {
        await store.delete(key);
        key = undefined;
      }
      if (!key) {
        key = await generateKey();
        setCookie(response, name, key, {
          httpOnly: true,
          maxAge: (maxAge / 1000) | 0,
          expires: new Date(getNow() + maxAge),
          secure,
          sameSite,
          domain,
          path,
        });
      }
      if (response.refreshSession || request.session !== session) {
        await store.set(key, request.session);
      }
      return response;
    }
    if (key) {
      setCookie(response, name, "", {
        httpOnly: true,
        maxAge: 0,
        expires: new Date(0),
        secure,
        sameSite,
        domain,
        path,
      });
      await store.delete(key);
    }
    return response;
  };
}

const DAYS = 24 * 60 * 60 * 1000;

async function defaultGenerateKey() {
  return (await randomBytes(48)).toString("hex");
}
