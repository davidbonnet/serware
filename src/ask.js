import { onRequest } from "./onRequest.js";
import { MockRequest } from "./MockRequest.js";
import { MockSocket } from "./MockSocket.js";
import { MockResponse } from "./MockResponse.js";

export async function ask(handler, options = {}) {
  const answer = onRequest(handler);
  const { socket = new MockSocket() } = options;
  const request = new MockRequest(options, socket);
  const response = new MockResponse(request);
  response.assignSocket(request.connection);
  return await answer(request, response);
}
