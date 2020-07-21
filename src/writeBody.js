import { Readable } from 'stream'
import { Buffer } from 'buffer'

import { pipeline } from './promisified'
import { isStream } from './isStream'

const { isBuffer } = Buffer

export async function writeBody(request, next) {
  const response = await next(request)
  const { body = '', charset, tube } = response
  const source = isStream(body)
    ? body
    : isBuffer(body)
    ? streamFromBuffer(body)
    : Readable.from(body, {
        objectMode: false,
        encoding: charset,
      })
  await (tube ? pipeline(source, tube, response) : pipeline(source, response))
  return response
}

function streamFromBuffer(buffer) {
  return new Readable({
    read() {
      this.push(buffer)
      this.push(null)
    },
  })
}
