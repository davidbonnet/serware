import test from 'ava'

import { combine } from '../combine.js'
import { ask } from '../ask.js'
import { writeHeaders } from '../writeHeaders.js'
import { writeCompressibleBody } from '../writeCompressibleBody.js'
import { writeContentEncoding } from '../writeContentEncoding.js'
import { writeContentLength } from '../writeContentLength.js'
import { writeCookies } from '../writeCookies.js'

test.skip('writes body in gzip', async (assert) => {
  const handler = combine(
    writeCompressibleBody,
    writeHeaders,
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
  assert.snapshot(await response.toBinary(), 'matches')
})

test('writes body in br', async (assert) => {
  const handler = combine(
    writeCompressibleBody,
    writeHeaders,
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
  assert.snapshot(await response.toBinary(), 'matches')
})

test('writes uncompressed body if no compatible acceptable encoding found', async (assert) => {
  const handler = combine(
    writeCompressibleBody,
    writeHeaders,
    writeContentLength,
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
