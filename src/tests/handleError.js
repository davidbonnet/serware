import test from 'ava'

import { combine } from '../combine'
import { ask } from '../ask'
import { handleError } from '../handleError'
import { MockResponse } from '../MockResponse'
import { HTTPError } from '../HTTPError'

test('handles error', async (assert) => {
  const handler = combine(
    handleError({
      Response: MockResponse,
      callback(response, error) {
        response.body = error.toString()
        return response
      },
    }),
    () => {
      throw new Error('Some error occurred')
    },
  )
  const response = await ask(handler)
  assert.snapshot(await response.toString(), 'matches')
})

test('returns error by default', async (assert) => {
  const handler = combine(
    handleError({
      Response: MockResponse,
    }),
    () => {
      throw new HTTPError(404)
    },
  )
  const response = await ask(handler)
  assert.snapshot(await response.toString(), 'matches')
})
