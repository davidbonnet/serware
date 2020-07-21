import { Readable, pipeline } from 'stream'
import { createDeflate, createGzip, createBrotliCompress } from 'zlib'

import { isString } from 'lodash'

export function writeCompressibleBody(next) {
  return async (request) => {
    const acceptEncoding = request.headers['accept-encoding'] || ''
    if (/\bdeflate\b/.test(acceptEncoding)) {
      request.response.setHeader('content-encoding', 'deflate')
    } else if (/\bgzip\b/.test(acceptEncoding)) {
      request.response.setHeader('content-encoding', 'gzip')
    } else if (/\bbr\b/.test(acceptEncoding)) {
      request.response.setHeader('content-encoding', 'br')
    }
    const response = await next(request)
    return new Promise((resolve, reject) => {
      const contentEncoding = response.getHeader('content-encoding')
      const { data } = response
      const source = isString(data) ? Readable.from([data]) : data
      if (!source) {
        console.log('source missing')
      }
      if (!response) {
        console.log('response missing')
      }
      const done = (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve(response)
      }
      if (contentEncoding === 'deflate') {
        pipeline(source, createDeflate(), response, done)
      } else if (contentEncoding === 'gzip') {
        pipeline(source, createGzip(), response, done)
      } else if (contentEncoding === 'br') {
        pipeline(source, createBrotliCompress(), response, done)
      } else {
        pipeline(source, response, done)
      }
    })
  }
}
