import { pipe } from './tools/pipe.js'
import { toReadableStream } from './toReadableStream.js'

export async function writeBody(request, next) {
  const response = await next(request)
  if (response.writableEnded) {
    // FIXME: Throw error?
    return response
  }
  const { body, charset, tube } = response
  if (body == null) {
    if (tube) {
      tube.end()
    }
    return response
  }
  const source = toReadableStream(body, charset)
  await (tube ? pipe(source, tube, response) : pipe(source, response))
  return response
}
