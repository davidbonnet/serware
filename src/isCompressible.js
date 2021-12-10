import { GZIP, BR } from './getAcceptedEncoding.js'

export function isCompressible(request) {
  const acceptEncoding = request.headers['accept-encoding']
  return REGEXP.test(acceptEncoding)
}

const REGEXP = new RegExp(`\\b(?:${GZIP}|${BR})\\b`, 'i')
