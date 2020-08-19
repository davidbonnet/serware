import { join } from 'path'

import test from 'ava'

import { combine } from '../combine'
import { ask } from '../ask'
import { exposeFolder } from '../exposeFolder'
import { writeBody } from '../writeBody'
import { writeHeaders } from '../writeHeaders'

test('exposes folder', async (assert) => {
  const handler = combine(
    writeBody,
    writeHeaders,
    exposeFolder({
      path: join(__dirname, './fixtures/files'),
      cache: false,
    }),
  )
  const response1 = await ask(handler, {
    url: '/data.json',
  })
  assert.snapshot(await response1.toString(), 'returns json file')
  const response2 = await ask(handler, {
    url: '/page.html',
  })
  assert.snapshot(await response2.toString(), 'returns html file')
})
