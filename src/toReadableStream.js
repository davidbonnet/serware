import { Readable } from 'stream'
import { Buffer } from 'buffer'

import { isStream } from './isStream'

const { isBuffer } = Buffer

export function toReadableStream(value, encoding) {
  return isStream(value)
    ? value
    : isBuffer(value)
    ? new Readable({
        read() {
          this.push(value)
          this.push(null)
        },
      })
    : Readable.from(value, {
        objectMode: false,
        encoding,
      })
}
