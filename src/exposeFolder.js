import { join, normalize } from 'path'
import { createReadStream } from 'fs'

import { lookup } from 'mime-types'

import { stat } from './promisified'
import { getAcceptedEncodingList } from './getAcceptedEncodingList'
import { isChildPath } from './isChildPath'
import { COMPRESSIBLE_CONTENT_TYPES } from './COMPRESSIBLE_CONTENT_TYPES'
import { STATUS_CODES } from './STATUS_CODES'

const { decodeURI, Date } = global

export function exposeFolder({
  path: folderPath,
  index,
  cache = false,
  maxAge = 1 * YEARS,
  lastModified = true,
  compressibleContentTypes = COMPRESSIBLE_CONTENT_TYPES,
  getContentType = lookup,
}) {
  return async function (request, next) {
    const pathname = normalize(
      join(
        folderPath,
        decodeURI(request.pathname == null ? request.url : request.pathname),
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
    if (maxAge != null) {
      response.setHeader(
        'Cache-Control',
        `public, max-age=${maxAge}, must-revalidate`,
      )
    }
    if (lastModified && stats.mtime) {
      const lastRequestDate = request.headers['if-modified-since']
      if (
        lastRequestDate &&
        // The precision of `stats` is down to a millisecond while `lastRequestDate` is down to a second
        Date.parse(lastRequestDate) - stats.mtime.valueOf() > -1000
      ) {
        response.statusCode = STATUS_CODES.NOT_MODIFIED
        return response
      }
      response.setHeader('Last-Modified', stats.mtime.toUTCString())
    }
    const contentType = getContentType(pathname)
    if (contentType) {
      response.setHeader('Content-Type', contentType)
      if (contentType in compressibleContentTypes) {
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
              response.setHeader('Content-Encoding', acceptedEncoding)
              return response
            }
          } catch (error) {
            // Ignore
          }
        }
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
