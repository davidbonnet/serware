import { types } from 'util'
import { PassThrough } from 'stream'
import { Buffer } from 'buffer'

const CACHE = {}

const { isPromise } = types

export function isCached(request) {
  return request.url in CACHE
}

export async function useCache(request) {
  const cache = CACHE[request.url]
  if (isPromise(cache.body)) {
    cache.body = await cache.body
    CACHE[request.url] = cache
  }
  const response = request.respond(cache)
  response.setHeader('x-cached', 'yes')
  return response
}

export async function cache(request, next) {
  const response = await next(request)
  if (response.cache) {
    const tube = new PassThrough()
    response.tube = tube
    CACHE[request.url] = {
      headers: response.getHeaders(),
      body: buffer(tube),
    }
  }
  return response
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
