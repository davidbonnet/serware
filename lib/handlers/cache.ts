import { Buffer } from "buffer";
import { PassThrough } from "stream";
import { types } from "util";

import { stubTrue } from "lodash-es";

const { isPromise } = types;

export function cache({ store, shouldCache = stubTrue }) {
  return async function cache(request, next) {
    if (!shouldCache(request)) {
      return await next(request);
    }
    if (await store.has(request)) {
      const cache = await store.get(request);
      if (isPromise(cache.body)) {
        cache.body = await cache.body;
        await store.set(request, cache);
      }
      return await request.respond(cache);
    }
    const response = await next(request);
    const tube = new PassThrough();
    response.tube = tube;
    await store.set(request, {
      body: buffer(tube),
      charset: null,
      compress: false,
      headers: response.getHeaders(),
    });
    return response;
  };
}

function buffer(tube) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    tube
      .on("error", reject)
      .on("data", (chunk) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        resolve(Buffer.concat(chunks));
      });
  });
}
