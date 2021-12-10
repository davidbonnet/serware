import { respond } from './tools/respond.js'

export function onRequest(handle) {
  return async function listener(request, response) {
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
    const answer = await handle(request, request.respond)
    if (!answer.writableEnded) {
      answer.end()
    }
    return answer
  }
}
