import { Buffer } from 'buffer'
import { ServerResponse as DefaultResponse, STATUS_CODES } from 'http'

import { isString, isBuffer } from 'lodash'

const { byteLength } = Buffer

import { pipeline } from './promisified'
import { toReadableStream } from './toReadableStream'

export function handleError({ callback, Response = DefaultResponse } = {}) {
  return async function (request, next) {
    try {
      return await next(request)
    } catch (error) {
      // Create a new response object
      const response = new Response(request)
      const { connection: socket } = request
      if (socket._httpMessage) {
        socket._httpMessage = null
      }
      response.assignSocket(socket)
      response.statusCode = error.statusCode || 500
      response.body = error.statusCode ? error.message : undefined
      if (callback) {
        await callback(error, response)
      }
      if (!response.headersSent) {
        const { statusCode, body = '', charset } = response
        if (
          !response.hasHeader('Content-Length') &&
          (isString(body) || isBuffer(body))
        ) {
          response.setHeader('Content-Length', byteLength(body, charset))
        }
        response.writeHead(
          statusCode,
          response.statusMessage || STATUS_CODES[statusCode] || '',
        )
      }
      if (!response.writableEnded) {
        const { body, charset } = response
        if (body != null) {
          const source = toReadableStream(body, charset)
          await pipeline(source, response)
        }
        response.end()
      }
      return response
    }
  }
}
