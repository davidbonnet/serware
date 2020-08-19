import test from 'ava'

import { combine } from '../combine'
import { ask } from '../ask'
import { writeBody } from '../writeBody'
import { writeHeaders } from '../writeHeaders'
import { writeContentLength } from '../writeContentLength'

test('writes content length', async (assert) => {
  const handler = combine(
    writeBody,
    writeHeaders,
    writeContentLength,
    async (request, next) => {
      const response = await next(request)
      response.body = 'Should be 13.'
      return response
    },
  )
  const response = await ask(handler)
  assert.snapshot(await response.toString(), 'matches')
})
