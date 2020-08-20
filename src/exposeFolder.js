import { relative, isAbsolute, join, normalize } from 'path'
import { createReadStream } from 'fs'

import { lookup as getContentType } from 'mime-types'

import { stat } from './promisified'
import { getAcceptedEncodingList } from './getAcceptedEncodingList'

export function exposeFolder({
  path: folderPath,
  cache = false,
  lastModified = true,
}) {
  return async function (request, next) {
    const pathname = join(
      folderPath,
      normalize(
        (request.pathname == null ? request.url : request.pathname).slice(1),
      ),
    )
    if (!isChildPath(folderPath, pathname)) {
      return next(request)
    }
    const response = request.respond()
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
      return next(request)
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

function isChildPath(parent, current) {
  const path = relative(parent, current)
  return path && !path.startsWith('..') && !isAbsolute(path)
}

const COMPRESSIBLE_CONTENT_TYPES = {
  'text/css': true,
  'text/plain': true,
  'text/html': true,
  'text/javascript': true,
  'application/javascript': true,
  'application/json': true,
  'application/x-javascript': true,
  'application/xml': true,
  'application/xml+rss': true,
  'application/xhtml+xml': true,
  'application/x-font-ttf': true,
  'application/x-font-opentype': true,
  'application/vnd.ms-fontobject': true,
  'image/svg+xml': true,
  'image/x-icon': true,
  'application/rss+xml': true,
  'application/atom_xml': true,
}
