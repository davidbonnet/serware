import { URL } from 'url'

export function captureUrl(pattern, ...names) {
  return function (request, next) {
    if (!request.href) {
      const href = new URL(
        `http://${request.headers['host'] || 'localhost'}${request.url}`,
      )
      request.href = href
      request.pathname = href.pathname
    }
    const { pathname } = request
    const match = pattern.exec(pathname)
    if (match == null || match.index !== 0) {
      return next(request)
    }
    if (request.captures == null) {
      request.captures = {}
    }
    const { captures } = request
    const { length } = names
    for (let i = 0; i < length; i++) {
      const name = names[i]
      captures[name] = match[i + 1]
    }
    request.pathname = pathname.slice(match[0].length)
    return next(request)
  }
}
