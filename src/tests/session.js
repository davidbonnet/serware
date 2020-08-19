import test from 'ava'

import { combine } from '../combine'
import { ask } from '../ask'
import { session } from '../session'
import { clearSession } from '../clearSession'
import { getSessionValue } from '../getSessionValue'
import { setSessionValue } from '../setSessionValue'
import { writeCookies } from '../writeCookies'
import { sessionStoreMap } from '../sessionStoreMap'

test('creates session', async (assert) => {
  const store = sessionStoreMap()
  const handler = combine(
    writeCookies,
    session({
      store,
      generateKey() {
        return Promise.resolve('newKey')
      },
    }),
    async (request, next) => {
      assert.is(request.session, null, 'no session')
      request.session = { data: 42 }
      const response = await next(request)
      return response
    },
  )
  const response = await ask(handler)
  assert.snapshot(await response.toString(), 'matches')
  assert.is((await store.get('newKey')).data, 42, 'stored session value')
})

test('uses existing session', async (assert) => {
  const store = sessionStoreMap()
  await store.set('currentKey', {
    name: 'value',
  })
  const handler = combine(
    session({
      store,
    }),
    async (request, next) => {
      assert.is(
        getSessionValue(request, 'name'),
        'value',
        'found session value',
      )
      assert.is(
        getSessionValue(request, 'unknown', 42),
        42,
        'get default session value',
      )
      const response = await next(request)
      return response
    },
  )
  const response = await ask(handler, {
    cookies: {
      session: 'currentKey',
    },
  })
  assert.snapshot(await response.toString(), 'matches')
})

test('updates session value only when necessary', async (assert) => {
  const store = sessionStoreMap()
  await store.set('currentKey', {
    name: 'value',
  })
  store.set = () => {
    throw new Error('Set session value')
  }
  const handler = combine(
    session({
      store,
    }),
    async (request, next) => {
      assert.is(
        setSessionValue(request, 'name', 'value'),
        'value',
        'returns current value',
      )
      const response = await next(request)
      return response
    },
  )
  await ask(handler, {
    cookies: {
      session: 'currentKey',
    },
  })
})

test('refreshes session key', async (assert) => {
  const store = sessionStoreMap()
  await store.set('currentKey', {
    name: 'value',
  })
  const handler = combine(
    writeCookies,
    session({
      store,
      generateKey() {
        return Promise.resolve('newKey')
      },
    }),
    async (request, next) => {
      const response = await next(request)
      response.refreshSession = true
      return response
    },
  )
  const response = await ask(handler, {
    cookies: {
      session: 'currentKey',
    },
  })
  assert.snapshot(await response.toString(), 'matches')
})

test('deletes existing session', async (assert) => {
  const store = sessionStoreMap()
  await store.set('currentKey', {
    name: 'value',
  })
  const handler = combine(
    writeCookies,
    session({
      store,
    }),
    async (request, next) => {
      clearSession(request)
      const response = await next(request)
      return response
    },
  )
  const response = await ask(handler, {
    cookies: {
      session: 'currentKey',
    },
  })
  assert.snapshot(await response.toString(), 'matches')
})
