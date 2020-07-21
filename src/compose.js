import { identity } from 'lodash'

export function compose(...funcs) {
  switch (funcs.length) {
    case 0:
      return identity
    case 1:
      return funcs[0]
    default:
      return funcs.reduce((a, b) => (...args) => a(b(...args)), identity)
  }
}
