import test from 'ava'

import { combine } from '../combine'
import { ask } from '../ask'
import { writeBody } from '../writeBody'
import { writeHeaders } from '../writeHeaders'
import { writeContentLength } from '../writeContentLength'
import { routeUrl } from '../routeUrl'
import { exact } from '../exact'
import { STATUS_CODES } from '../STATUS_CODES'

test('routes url', async (assert) => {
  const handlerA = async (request) => {
    const response = await request.respond()
    response.body = 'This is A'
    return response
  }
  const handler = combine(
    writeBody,
    writeHeaders,
    writeContentLength,
    routeUrl({
      '/a': handlerA,
      '/b': exact(async (request) => {
        const response = await request.respond()
        response.body = 'This is B'
        return response
      }),
      '/ab': async (request) => {
        const response = await request.respond()
        response.body = 'This is AB'
        return response
      },
      '/c': routeUrl({
        '': async (request) => {
          const response = await request.respond()
          response.body = 'This is C'
          return response
        },
        '/d': async (request) => {
          const response = await request.respond()
          response.body = 'This is C/D'
          return response
        },
        '/a': handlerA,
      }),
    }),
    (request) => request.respond({ statusCode: STATUS_CODES.NOT_FOUND }),
  )
  const responseA = await ask(handler, {
    url: '/a',
  })
  assert.snapshot(await responseA.toString(), 'matches A')
  const responseAA = await ask(handler, {
    url: '/aa',
  })
  assert.snapshot(await responseAA.toString(), 'matches A through AA')
  const responseB = await ask(handler, {
    url: '/b',
  })
  assert.snapshot(await responseB.toString(), 'matches B')
  const responseBB = await ask(handler, {
    url: '/bb',
  })
  assert.snapshot(await responseBB.toString(), 'matches nothing')
  const responseAB = await ask(handler, {
    url: '/ab',
  })
  assert.snapshot(await responseAB.toString(), 'matches AB')
  const responseC = await ask(handler, {
    url: '/c',
  })
  assert.snapshot(await responseC.toString(), 'matches C')
  const responseCD = await ask(handler, {
    url: '/c/d',
  })
  assert.snapshot(await responseCD.toString(), 'matches C/D')
  const responseCA = await ask(handler, {
    url: '/c/a',
  })
  assert.snapshot(await responseCA.toString(), 'matches A through C')
})
