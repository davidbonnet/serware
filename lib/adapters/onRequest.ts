import { IncomingMessage, type ServerResponse } from "http";

import type { Handler, Request } from "../types.js";

import { respond } from "./respond.js";

class AdaptedRequest extends IncomingMessage {
  constructor(private incomingMessage: IncomingMessage) {
    super(incomingMessage.socket);
  }

  get url() {
    return this.incomingMessage.url;
  }
}

export function onRequest(handler: Handler) {
  return async function listener(
    incomingMessage: IncomingMessage,
    serverResponse: ServerResponse,
  ) {
    incomingMessage.url;
    request.respond = function (options) {
      if (options == null) {
        return response;
      }
      if (options.respond != null) {
        // If request object is provided, return its response object
        return options.respond();
      }
      return respond(response, options);
    };
    const answer = await handler(request, request.respond);
    if (
      !answer.writableEnded &&
      answer.getHeader("Connection") !== "keep-alive"
    ) {
      answer.end();
    }
    return answer;
  };
}
