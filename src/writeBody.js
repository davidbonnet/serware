import { pipeline } from './promisified'
import { toReadableStream } from './toReadableStream'

export async function writeBody(request, next) {
  const response = await next(request)
  if (response.writableEnded) {
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
  await (tube ? pipeline(source, tube, response) : pipeline(source, response))
  return response
}
