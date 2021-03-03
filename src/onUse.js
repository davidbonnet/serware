import { respond } from './tools/respond'

export function onUse(handle) {
  /*
  Adapts a Serware `handler` to the [`connect`](https://github.com/senchalabs/connect) API.
  Note that the `handler` second argument, `next`, calls the next middleware, preventing any changes to the response object. Nothing is returned by 
  */
  return async function (request, response, next) {
    request.respond = function (options) {
      if (options == null) {
        return response
      }
      if (options.respond != null) {
        // If request object is provided, return its response object
        return options.respond()
      }
      return respond(response, options)
    }
    await handle(request, (request) => {
      if (request != null) {
        throw new Error(
          'Calls to "next" should be performed without any argument.',
        )
      }
      next()
    })
  }
}
