import test from 'ava'

import { combine } from '../combine'
import { ask } from '../ask'
import { writeCookies } from '../writeCookies'
import { setCookie } from '../setCookie'
import { getNow } from '../getNow'

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
