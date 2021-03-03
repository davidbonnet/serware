import { toPairs, orderBy } from 'lodash'

import { setHref } from './setHref'

export function routeUrl(routes) {
  const orderedRoutes = orderBy(toPairs(routes), ['0.length'], ['desc'])
  return async function (request, next) {
    if (!request.href) {
      setHref(request)
    }
    const { pathname } = request
    const { length } = orderedRoutes
    const { length: pathnameLength } = pathname
    for (let i = 0; i < length; i++) {
      const route = orderedRoutes[i]
      const pattern = route[0]
      const handler = route[1]
      if (pattern.length > pathnameLength) {
        continue
      }
      if (pattern === pathname || pathname.startsWith(pattern)) {
        request.pathname = pathname.slice(pattern.length)
        return await handler(request, function (request) {
          request.pathname = pathname
          return next(request)
        })
      }
    }
    return await next(request)
  }
}
