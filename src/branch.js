export function branch(condition, left, right = identity) {
  return async function (request, next) {
    return await ((await condition(request)) ? left : right)(request, next)
  }
}

function identity(request, next) {
  return next(request)
}
