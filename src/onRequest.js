import { respond } from './respond'

export function onRequest(next) {
  return async function handler(request, response) {
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
    const answer = await next(request, request.respond)
    if (!answer.writableEnded) {
      answer.end()
    }
    return answer
  }
}
