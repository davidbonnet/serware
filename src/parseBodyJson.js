import { parseBody } from './parseBody.js'
import { decompress } from './decompress.js'
import { parseNumber } from './parseNumber.js'
import { HTTPError } from './HTTPError.js'

export async function parseBodyJson(request, limit) {
  const contentLength = parseNumber(request.headers['content-length'])
  const encoding = request.headers['content-encoding']
  const string = await parseBody(
    decompress(request),
    encoding,
    contentLength,
    limit,
  )
  try {
    return JSON.parse(string)
  } catch (error) {
    throw new HTTPError(400, 'Invalid JSON')
  }
}
