import { createUnzip } from 'zlib'

import { toLower } from 'lodash-es'

import { HTTPError } from './HTTPError.js'

export function decompress(stream, encoding = 'identity', options) {
  switch (toLower(encoding)) {
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
