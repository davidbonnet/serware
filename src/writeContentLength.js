import { Buffer } from 'buffer'

import { isString } from 'lodash'

const { byteLength } = Buffer

export async function writeContentLength(request, next) {
  const response = await next(request)
  const { body, charset } = response
  if (
    !response.hasHeader('content-length') &&
    !response.hasHeader('content-encoding') &&
    isString(body)
  ) {
    response.setHeader('content-length', byteLength(body, charset))
  }
  return response
}
