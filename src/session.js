import { randomBytes } from './promisified'
import { getCookies } from './getCookies'
import { setCookie } from './setCookie'

export function session({
  store,
  name = 'session',
  maxAge = 7 * DAYS,
  secure,
  sameSite = 'lax',
  domain,
  path,
}) {
  return async function (request, next) {
    const cookies = getCookies(request)
    let key = cookies[name]
    const session = key ? await store.get(key) : null
    if (key && session == null) {
      key = undefined
    }
    request.session = session
    const response = await next(request)
    if (request.session) {
      if (!key) {
        key = (await randomBytes(48)).toString('hex')
        setCookie(response, name, key, {
          httpOnly: true,
          maxAge,
          expires: new Date(Date.now() + maxAge * 1000),
          secure,
          sameSite,
          domain,
          path,
        })
      }
      if (request.session !== session) {
        await store.set(key, request.session)
      }
      return response
    }
    if (key) {
      setCookie(response, name, '', {
        httpOnly: true,
        maxAge: 0,
        expires: new Date(0),
        secure,
        sameSite,
        domain,
        path,
      })
      await store.set(key)
    }
    return response
  }
}

const DAYS = 24 * 60 * 60
