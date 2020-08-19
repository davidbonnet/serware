import test from 'ava'

import { combine } from '../combine'
import { ask } from '../ask'
import { writeCompressibleBody } from '../writeCompressibleBody'
import { writeContentEncoding } from '../writeContentEncoding'
import { writeCookies } from '../writeCookies'

test('writes body in gzip', async (assert) => {
  const handler = combine(
    writeCompressibleBody,
    writeContentEncoding,
    writeCookies,
    async (request, next) => {
      const response = await next(request)
      response.compress = true
      response.body = 'Response body'
      return response
    },
  )
  const response = await ask(handler, {
    headers: {
      'accept-encoding': 'gzip,br',
    },
  })
  assert.snapshot(await response.toString(), 'matches')
})

test('writes body in br', async (assert) => {
  const handler = combine(
    writeCompressibleBody,
    writeContentEncoding,
    writeCookies,
    async (request, next) => {
      const response = await next(request)
      response.compress = true
      response.body = 'Response body'
      return response
    },
  )
  const response = await ask(handler, {
    headers: {
      'accept-encoding': 'br',
    },
  })
  assert.snapshot(await response.toString(), 'matches')
})

test('writes uncompressed body if no compatible acceptable encoding found', async (assert) => {
  const handler = combine(
    writeCompressibleBody,
    writeContentEncoding,
    writeCookies,
    async (request, next) => {
      const response = await next(request)
      response.compress = true
      response.body = 'Response body'
      return response
    },
  )
  const response = await ask(handler, {
    headers: {
      'accept-encoding': 'deflate',
    },
  })
  assert.snapshot(await response.toString(), 'matches')
})
