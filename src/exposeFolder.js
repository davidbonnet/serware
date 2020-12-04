import { join, normalize } from 'path'
import { createReadStream } from 'fs'

import { lookup as getContentType } from 'mime-types'

import { stat } from './promisified'
import { getAcceptedEncodingList } from './getAcceptedEncodingList'
import { isChildPath } from './isChildPath'
import { COMPRESSIBLE_CONTENT_TYPES } from './COMPRESSIBLE_CONTENT_TYPES'

export function exposeFolder({
  path: folderPath,
  index,
  cache = false,
  maxAge = 1 * YEARS,
  lastModified = true,
}) {
  return async function (request, next) {
    const pathname = normalize(
      join(
        folderPath,
        request.pathname == null ? request.url.slice(1) : request.pathname,
      ),
    )
    if (!isChildPath(folderPath, pathname)) {
      return next(request)
    }
    let stats
    try {
      stats = await stat(pathname)
    } catch (error) {
      if (error.code === 'ENOENT') {
        return next(request)
      }
      throw error
    }
    if (!stats.isFile()) {
      if (index != null && stats.isDirectory()) {
        return index(pathname, request)
      }
      return next(request)
    }
    const response = request.respond()
    if (maxAge) {
      response.setHeader('Cache-Control', `public, max-age=${maxAge}`)
    }
    if (lastModified && stats.mtime) {
      response.setHeader('Last-Modified', stats.mtime.toUTCString())
    }
    const contentType = getContentType(pathname)
    if (contentType) {
      response.setHeader('Content-Type', contentType)
      if (contentType in COMPRESSIBLE_CONTENT_TYPES) {
        // Look for compressed version
        const acceptedEncodingList = getAcceptedEncodingList(
          request.headers['accept-encoding'],
        )
        const { length } = acceptedEncodingList
        for (let i = 0; i < length; i++) {
          const acceptedEncoding = acceptedEncodingList[i]
          const compressedPathname = `${pathname}.${acceptedEncoding}`
          try {
            const stats = await stat(compressedPathname)
            if (stats.isFile()) {
              response.body = createReadStream(compressedPathname)
              response.setHeader('Content-Length', stats.size)
              return response
            }
          } catch (error) {
            // Ignore
          }
        }
        // Enable compression for other handlers
        response.compress = true
      }
    }
    if (!response.compress) {
      response.setHeader('Content-Length', stats.size)
    }
    // Enable cache for other handlers
    response.cache = cache
    response.body = createReadStream(pathname)
    return response
  }
}

const YEARS = 60 * 60 * 24 * 365
