import { getAcceptedEncoding } from './getAcceptedEncoding'

export async function writeContentEncoding(request, next) {
  const acceptedEncoding = getAcceptedEncoding(
    request.headers['accept-encoding'],
  )
  const response = await next(request)
  if (response.headersSent) {
    return response
  }
  if (acceptedEncoding && response.compress) {
    response.setHeader('content-encoding', acceptedEncoding)
    return response
  }
  if (response.compress) {
    response.compress = false
  }
  return response
}
