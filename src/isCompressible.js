export function isCompressible(request) {
  const acceptEncoding = request.headers['accept-encoding']
  return /\b(?:deflate|gzip|br)\b/.test(acceptEncoding)
}
