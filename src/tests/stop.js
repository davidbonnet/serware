import test from 'ava'

import { stop } from '../stop'

test('stop', async (assert) => {
  const response = {}
  const request = {
    respond: () => Promise.resolve(response),
  }
  assert.is(await stop(request), response, 'returns request response')
})
