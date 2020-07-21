import { toPairs, orderBy } from 'lodash'

const { URL } = global

export function routeUrl(routes) {
  const orderedRoutes = orderBy(toPairs(routes), ['0.length'], ['desc'])
  return async function (request, next) {
    if (!request.href) {
      const href = new URL(`http://${request.headers['host']}${request.url}`)
      request.href = href
      request.pathname = href.pathname
      request.breadcrumbs = []
    }
    const { pathname } = request
    const { length } = orderedRoutes
    const { length: pathnameLength } = pathname
    for (let i = 0; i < length; i++) {
      const route = orderedRoutes[i]
      const pattern = route[0]
      const middleware = route[1]
      if (pattern.length > pathnameLength) {
        continue
      }
      if (pattern === pathname || pathname.startsWith(pattern)) {
        request.pathname = pathname.slice(pattern.length)
        request.breadcrumbs.push(pattern)
        return await middleware(request, next)
      }
    }
    return await next(request)
  }
}
