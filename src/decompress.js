import { createUnzip } from 'zlib'

import { HTTPError } from './HTTPError'

export function decompress(stream, encoding = 'identity', options) {
  switch (encoding && encoding.toLowerCase()) {
    case 'gzip':
    case 'deflate':
      break
    case 'identity':
      return stream
    default:
      throw new HTTPError(415, `Unsupported Content-Encoding: ${encoding}`)
  }
  return stream.pipe(createUnzip(options))
}
