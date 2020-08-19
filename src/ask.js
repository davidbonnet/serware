import { onRequest } from './onRequest'
import { MockRequest } from './MockRequest'
import { MockSocket } from './MockSocket'
import { MockResponse } from './MockResponse'

export async function ask(handler, options = {}) {
  const answer = onRequest(handler)
  const { socket = new MockSocket() } = options
  const request = new MockRequest(options, socket)
  const response = new MockResponse(request)
  response.assignSocket(request.connection)
  return await answer(request, response)
}
