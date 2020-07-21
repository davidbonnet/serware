export function log(format) {
  return (next) => async (request) => {
    await format(request)
    return await next(request)
  }
}
