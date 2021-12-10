import test from 'ava'

import { combine } from '../combine.js'
import { ask } from '../ask.js'
import { writeCookies } from '../writeCookies.js'
import { setCookie } from '../setCookie.js'
import { getNow } from '../getNow.js'

test('writes cookies', async (assert) => {
  const handler = combine(writeCookies, async (request, next) => {
    const response = await next(request)
    setCookie(response, 'first', 'value', {
      expires: new Date(getNow()),
      httpOnly: true,
      sameSite: 'lax',
    })
    setCookie(response, 'second', '42')
    return response
  })
  const response = await ask(handler)
  assert.snapshot(await response.toString(), 'matches')
})

test('writes nothing when no cookies set', async (assert) => {
  const handler = combine(writeCookies, async (request, next) => {
    return await next(request)
  })
  const response = await ask(handler)
  assert.snapshot(await response.toString(), 'matches')
})
