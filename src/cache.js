import { types } from 'util'
import { PassThrough } from 'stream'
import { Buffer } from 'buffer'

const { isPromise } = types

export function cache({ store, shouldCache = defaultShouldCache }) {
  return async function cache(request, next) {
    if (await store.has(request)) {
      const cache = await store.get(request)
      if (isPromise(cache.body)) {
        cache.body = await cache.body
        await store.set(request, cache)
      }
      return await request.respond(cache)
    }
    const response = await next(request)
    if (shouldCache(response)) {
      const tube = new PassThrough()
      response.tube = tube
      await store.set(request, {
        headers: response.getHeaders(),
        body: buffer(tube),
        charset: null,
        compress: false,
      })
    }
    return response
  }
}

function defaultShouldCache(request) {
  return request.cache
}

function buffer(tube) {
  return new Promise(function (resolve, reject) {
    const chunks = []
    tube.on('error', reject)
    tube.on('data', function (chunk) {
      chunks.push(chunk)
    })
    tube.on('end', function () {
      resolve(Buffer.concat(chunks))
    })
  })
}
