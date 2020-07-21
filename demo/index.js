import { createServer } from 'http'

import {
  branch,
  compose,
  isCompressible,
  log,
  middleware,
  routeMethod,
  routeUrl,
  setCookie,
  writeBody,
  writeCompressibleBody,
  writeCookies,
  writeHeaders,
} from '../src'

const test = (next) => async (request) => {
  const response = await next(request)
  response.data = '<body><h1>Test page</h1></body>'
  response.setHeader('content-type', 'text/html')
  setCookie(response, 'test', '42', {
    expires: new Date(Date.now() + 10000),
  })
  setCookie(response, 'test2', '84', {
    expires: new Date(Date.now() + 20000),
  })
  return response
}

const printPath = (next) => async (request) => {
  const data = `<body><h1>Print path</h1><p>Got pathname: "${
    request.pathname
  }" and breadcrumbs: "${request.breadcrumbs.join(' - ')}"</p></body>`
  const response = await next(request)
  response.data = data
  response.setHeader('content-type', 'text/html')
  return response
}

const printMessage = (message, contentType = 'text/plain') => (next) => async (
  request,
) => {
  const response = await next(request)
  response.data = message
  response.setHeader('content-type', contentType)
  return response
}

const printHtmlMessage = (message) => (next) => async (request) => {
  return await printMessage(
    `<body><h1>${message}</h1></body>`,
    'text/html',
  )(next)(request)
}

const handlers = compose(
  // (next) => async (request) => {
  //   console.log(
  //     'Request from',
  //     request.connection.remoteAddress,
  //     request.headers['x-forwarded-for'],
  //   )
  //   console.log('request.httpVersion', request.httpVersion)
  //   console.log('request.method', request.method)
  //   console.log('request.url', request.url)
  //   console.log('request.headers', request.headers)
  //   const response = await next(request)
  //   console.log('response.getHeaders()', response.getHeaders())
  //   return response
  // },
  // branch(isCompressible, writeCompressibleBody, writeBody),
  writeBody,
  writeHeaders,
  writeCookies,
  routeUrl({
    '/test': test,
    '/hello': printMessage('Hello'),
    '/a': routeUrl({
      '/b': routeMethod({ GET: printHtmlMessage('This is a/b') }),
      '/b2': printPath,
      '': printHtmlMessage('This is the first page A'),
    }),
  }),
)

const raw = (request, response) => {
  response.writeHead(200, 'OK')
  const data = 'Hello there'
  response.write(data, response.dataEncoding, () => response.end())
}

const server = createServer(middleware(handlers))
// const server = createServer(raw)
server.on('clientError', (error, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})
// let i = 0
// server.on('connection', (error, socket) => {
//   console.log('connection', ++i)
// })
server.keepAliveTimeout = 5000
server.listen(9000)
