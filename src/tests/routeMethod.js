import test from 'ava'

import { combine } from '../combine'
import { ask } from '../ask'
import { writeBody } from '../writeBody'
import { writeHeaders } from '../writeHeaders'
import { writeContentLength } from '../writeContentLength'
import { routeMethod } from '../routeMethod'

test('routes url', async (assert) => {
  const handler = combine(
    writeBody,
    writeHeaders,
    writeContentLength,
    routeMethod({
      GET: async (request) => {
        const response = await request.respond()
        response.body = 'This is GET'
        return response
      },
      POST: async (request) => {
        const response = await request.respond()
        response.body = 'This is POST'
        return response
      },
      PUT: async (request) => {
        const response = await request.respond()
        response.body = 'This is PUT'
        return response
      },
    }),
    (request) => {
      return request.respond({ statusCode: 405 })
    },
  )
  const responseGET = await ask(handler, {
    method: 'GET',
  })
  assert.snapshot(await responseGET.toString(), 'matches GET')
  const responsePOST = await ask(handler, {
    method: 'POST',
  })
  assert.snapshot(await responsePOST.toString(), 'matches POST')
  const responsePUT = await ask(handler, {
    method: 'PUT',
  })
  assert.snapshot(await responsePUT.toString(), 'matches PUT')
  const responseDELETE = await ask(handler, {
    method: 'DELETE',
  })
  assert.snapshot(await responseDELETE.toString(), 'matches not allowed')
})
