import { identity } from 'lodash'

export function branch(condition, left, right = identity) {
  return (next) => async (request) =>
    await ((await condition(request)) ? left : right)(next)(request)
}
