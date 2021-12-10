import { createGzip, createBrotliCompress } from 'zlib'

import { pipe } from './tools/pipe.js'
import { toReadableStream } from './toReadableStream.js'
import { GZIP, BR } from './getAcceptedEncoding.js'

export async function writeCompressibleBody(request, next) {
  const response = await next(request)
  if (response.writableEnded) {
    return response
  }
  const { body, charset, tube, compress } = response
  if (body == null) {
    if (tube) {
      tube.end()
    }
    return response
  }
  const source = toReadableStream(body, charset)
  switch (compress && response.getHeader('content-encoding')) {
    case GZIP:
      await (tube
        ? pipe(source, createGzip(), tube, response)
        : pipe(source, createGzip(), response))
      break
    case BR:
      await (tube
        ? pipe(source, createBrotliCompress(), tube, response)
        : pipe(source, createBrotliCompress(), response))
      break
    default:
      await (tube ? pipe(source, tube, response) : pipe(source, response))
      break
  }
  return response
}
