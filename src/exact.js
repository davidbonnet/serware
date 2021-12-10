import { branch } from './branch.js'

export function exact(handler) {
  return branch((request) => !request.pathname, handler)
}
