import { createGzip, createBrotliCompress } from 'zlib'

import { toReadableStream } from './toReadableStream'
import { pipeline } from './promisified'
import { GZIP, BR } from './getAcceptedEncoding'

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
