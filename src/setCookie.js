import { serialize } from 'cookie'

export function setCookie(response, name, value, options) {
  if (!response.cookies) {
    response.cookies = []
  }
  response.cookies.push(serialize(name, value, options))
  return response
}
