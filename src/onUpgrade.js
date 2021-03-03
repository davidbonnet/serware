import { kServerResponse } from '_http_server'

import { respond } from './tools/respond'

export function onUpgrade(next) {
  return async function handler(request, socket, head) {
    request.connect = function (server) {
      if (head != null) {
        // If upgrade request, return websocket connexion
        return new Promise(function (resolve) {
          server.handleUpgrade(request, socket, head, resolve)
        })
      }
    }
    const server = this
    request.respond = function (options) {
      if (options == null) {
        return EMPTY_RESPONSE
      }
      if (options.respond != null) {
        // If request object is provided, return its response object
        return options.respond()
      }
      // Build response object according to native HTTP server
      const response = new server[kServerResponse](request)
      response.shouldKeepAlive = false
      response.assignSocket(socket)
      response.on(
        'finish',
        finishHandler.bind(undefined, request, response, socket),
      )
      return respond(response, options)
    }
    const message = await next(request, request.respond)
    if (!message.writableEnded) {
      message.end()
    }
  }
}

function finishHandler(request, response, socket) {
  response.detachSocket(socket)
  request.emit('close')
  if (response._last) {
    if (typeof socket.destroySoon === 'function') {
      socket.destroySoon()
    } else {
      socket.end()
    }
  }
}

const EMPTY_RESPONSE = {
  headersSent: true,
  sendDate: false,
  socket: null,
  statusCode: 200,
  statusMessage: 'OK',
  writableEnded: true,
  writableFinished: true,

  /* eslint-disable no-unused-vars */
  addTrailers(headers) {},
  end(data, encoding, callback) {},
  flushHeaders() {},
  getHeader(name) {},
  getHeaderNames() {},
  getHeaders() {},
  hasHeader() {},
  removeHeader(name) {},
  setHeader(name, value) {},
  writeHead(status, message) {},
  setTimeout(milliseconds, callback) {},
  write(chunk, encoding, callback) {},
  writeContinue() {},
  writeProcessing() {},
  /* eslint-enable no-unused-vars */
}
