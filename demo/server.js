import { createServer } from 'http'
import { join } from 'path'

import {
  branch,
  cache,
  compose,
  exact,
  exposeFolder,
  isCached,
  isCompressible,
  log,
  middleware,
  routeMethod,
  routeUrl,
  session,
  setCookie,
  useCache,
  writeBody,
  writeCompressibleBody,
  writeContentEncoding,
  writeContentLength,
  writeCookies,
  writeHeaders,
  getSessionValue,
  setSessionValue,
} from '../main'

async function test(request, next) {
  const response = await next(request)
  response.body = '<body><h1>Test page</h1></body>'
  response.setHeader('content-type', 'text/html')
  setCookie(response, 'test', '42', {
    expires: new Date(Date.now() + 10000),
    httpOnly: true,
    sameSite: 'lax',
  })
  setCookie(response, 'test2', '84', {
    expires: new Date(Date.now() + 20000),
  })
  return response
}

async function printPath(request) {
  const body = `<body><h1>Print path</h1><p>Got pathname: "${
    request.pathname
  }" and breadcrumbs: "${request.breadcrumbs.join(' - ')}"</p></body>`
  const response = request.respond()
  response.body = body
  response.setHeader('content-type', 'text/html')
  return response
}

function printMessage(message, contentType = 'text/plain', cache = true) {
  return function (request) {
    const response = request.respond()
    response.body = typeof message === 'function' ? message(request) : message
    response.setHeader('content-type', contentType)
    response.cache = cache && typeof message !== 'function'
    return response
  }
}

function printHtmlMessage(title, body = '', cache) {
  return function (request, next) {
    return printMessage(
      `<html><head><title>${title}</title></head><body><h1>${title}</h1>${body}</body></html>`,
      'text/html',
      cache,
    )(request, next)
  }
}

const SESSIONS = {}
const { stringify: formatJson, parse: parseJson } = JSON

const store = {
  get(key) {
    return SESSIONS[key]
  },
  set(key, value) {
    if (value == null) {
      delete SESSIONS[key]
      return
    }
    SESSIONS[key] = value
  },
}

const LINKS = [
  {
    href: '/files/page.html',
    label: 'Html test page with a picture',
  },
  {
    href: '/test',
    label: 'Test page',
  },
  {
    href: '/sessions',
    label: 'Current sessions',
  },
  {
    href: '/counter',
    label: 'Show counter',
  },
  {
    href: '/clear',
    label: 'Clear current session',
  },
]

const handlers = compose(
  // log({
  //   request(request) {
  //     console.log('request.headers', request.headers)
  //   },
  // }),
  branch(
    isCached,
    compose(writeBody, writeHeaders, writeContentLength, useCache),
  ),
  writeCompressibleBody,
  cache,
  writeHeaders,
  writeContentLength,
  writeContentEncoding,
  writeCookies,
  session({
    store,
  }),
  // printMessage('Hello there'),
  // null,
  routeUrl({
    '/files': exposeFolder(join(__dirname, 'files')),
    '/a': routeUrl({
      '/b': exact(routeMethod({ GET: printHtmlMessage('This is a/b') })),
      '/b2': printPath,
      '/c': routeMethod({ POST: printHtmlMessage('This is a/b') }),
      '': printHtmlMessage('This is the first page A'),
    }),
    '/test': exact(test),
    '/hello': exact(printMessage('Hello there')),
    '/counter': exact(async (request, next) => {
      const response = await next(request)
      const counter = getSessionValue(request, 'counter', 0) + 1
      setSessionValue(request, 'counter', counter)
      response.body = `Visited this page ${counter} times`
      return response
    }),
    '/clear': exact(async (request, next) => {
      const response = await next(request)
      request.session = null
      response.body = `Cleared the session`
      return response
    }),
    '/sessions': exact(printMessage(() => formatJson(SESSIONS, null, 2))),
    '/': exact(
      printHtmlMessage(
        'Index',
        `<ul>${LINKS.map(
          (link) => `<li><a href="${link.href}">${link.label}</a></li>`,
        ).join('')}</ul>`,
      ),
    ),
  }),
  printHtmlMessage('Page not found', false),
)

const raw = (request, response) => {
  response.writeHead(200, 'OK')
  const body = 'Hello there'
  response.write(body, response.charset, () => response.end())
}

export default function main() {
  const server = createServer(middleware(handlers))
  server.on('clientError', (error, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
  })
  server.keepAliveTimeout = 5000
  server.listen(9000)
  // eslint-disable-next-line no-console
  console.log('Listening on http://localhost:9000')
  return server
}
