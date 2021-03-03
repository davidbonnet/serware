export function use(handler) {
  /*
  Use a `connect`-like `handler`.
  */
  return async function (request, next) {
    return new Promise((resolve, reject) => {
      const response = request.respond()
      const result = handler(request, response, (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve(next(request))
      })
      if (result != null && typeof result.then === 'function') {
        result.then(() => {
          resolve(response)
        })
      }
    })
  }
}
