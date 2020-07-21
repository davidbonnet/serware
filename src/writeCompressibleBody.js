import { Readable } from 'stream'
import { createGzip, createBrotliCompress } from 'zlib'

import { pipeline } from './promisified'
import { GZIP, BR } from './getAcceptedEncoding'
import { isStream } from './isStream'

export async function writeCompressibleBody(request, next) {
  const response = await next(request)
  const { body = '', charset, tube } = response
  const source = isStream(body)
    ? body
    : Readable.from(body, {
        objectMode: false,
        encoding: charset,
      })
  switch (response.getHeader('content-encoding')) {
    case GZIP:
      await (tube
        ? pipeline(source, createGzip(), tube, response)
        : pipeline(source, createGzip(), response))
      break
    case BR:
      await (tube
        ? pipeline(source, createBrotliCompress(), tube, response)
        : pipeline(source, createBrotliCompress(), response))
      break
    default:
      await (tube
        ? pipeline(source, tube, response)
        : pipeline(source, response))
      break
  }
  return response
}
