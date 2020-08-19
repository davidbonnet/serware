import { randomBytes } from './promisified'
import { getCookies } from './getCookies'
import { setCookie } from './setCookie'
import { getNow } from './getNow'

export function session({
  store,
  name = 'session',
  maxAge = 7 * DAYS,
  secure,
  sameSite = 'lax',
  domain,
  path,
  generateKey = defaultGenerateKey,
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
      if (response.refreshSession && key) {
        await store.delete(key)
        key = undefined
      }
      if (!key) {
        key = await generateKey()
        setCookie(response, name, key, {
          httpOnly: true,
          maxAge,
          expires: new Date(getNow() + maxAge * 1000),
          secure,
          sameSite,
          domain,
          path,
        })
      }
      if (response.refreshSession || request.session !== session) {
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
      await store.delete(key)
    }
    return response
  }
}

const DAYS = 24 * 60 * 60

async function defaultGenerateKey() {
  return (await randomBytes(48)).toString('hex')
}
