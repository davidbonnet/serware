import test from 'ava'

import { combine } from '../combine'
import { ask } from '../ask'
import { writeBody } from '../writeBody'
import { writeHeaders } from '../writeHeaders'
import { writeContentLength } from '../writeContentLength'
import { matchUrl } from '../matchUrl'
import { exact } from '../exact'
import { STATUS_CODES } from '../STATUS_CODES'

test('matches url patterns', async (assert) => {
  const handler = combine(
    writeBody,
    writeHeaders,
    writeContentLength,
    matchUrl(
      /^\/([a-z_]+)\/([0-9]+)/,
      ['project', 'id'],
      exact((request) =>
        request.respond({
          body: JSON.stringify(request.matches, null, 2),
        }),
      ),
    ),
    (request) => request.respond({ statusCode: STATUS_CODES.NOT_FOUND }),
  )
  const responseA = await ask(handler, {
    url: '/serware/123',
  })
  assert.snapshot(await responseA.toString(), 'matches the URL')
  const responseB = await ask(handler, {
    url: '/serware',
  })
  assert.snapshot(await responseB.toString(), 'does not match the URL')
})
