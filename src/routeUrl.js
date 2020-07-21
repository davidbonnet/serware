import { toPairs, orderBy } from 'lodash'

const { URL } = global

export function routeUrl(routes) {
  const orderedRoutes = orderBy(toPairs(routes), ['0.length'], ['desc'])
  return (next) => async (request) => {
    if (!request.href) {
      const href = new URL(`http://${request.headers['host']}${request.url}`)
      request.href = href
      request.pathname = href.pathname
      request.breadcrumbs = []
    }
    const { pathname } = request
    const { length } = orderedRoutes
    for (let i = 0; i < length; i++) {
      const route = orderedRoutes[i]
      if (pathname.startsWith(route[0])) {
        request.pathname = pathname.slice(route[0].length)
        request.breadcrumbs.push(route[0])
        return await route[1](next)(request)
      }
    }
    return await next(request)
  }
}
