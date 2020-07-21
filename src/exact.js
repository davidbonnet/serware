import { branch } from './branch'

export function exact(handler) {
  return branch((request) => !request.pathname, handler)
}
