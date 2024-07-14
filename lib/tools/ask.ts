import { MockRequest } from "../adapters/MockRequest.js";
import { MockResponse } from "../adapters/MockResponse.js";
import { MockSocket } from "../adapters/MockSocket.js";
import { onRequest } from "../adapters/onRequest.js";

export async function ask(handler, options = {}) {
  const answer = onRequest(handler);
  const { socket = new MockSocket() } = options;
  const request = new MockRequest(options, socket);
  const response = new MockResponse(request);
  response.assignSocket(request.connection);
  return await answer(request, response);
}
