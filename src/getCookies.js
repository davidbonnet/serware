import { parse } from 'cookie'

export function getCookies(request) {
  if (request.cookies == null) {
    request.cookies = parse(request.headers['cookie'] || '')
  }
  return request.cookies
}
