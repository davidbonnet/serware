import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { join, normalize } from "path";

import { stubFalse } from "lodash-es";
import { lookup } from "mime-types";

import { COMPRESSIBLE_CONTENT_TYPES } from "../constants/COMPRESSIBLE_CONTENT_TYPES.js";
import { STATUS_CODES } from "../constants/STATUS_CODES.js";
import { getAcceptedEncodingList } from "../tools/getAcceptedEncodingList.js";
import { isChildPath } from "../tools/isChildPath.js";

const { decodeURI, Date } = global;

export function exposeFolder({
  path: folderPath,
  index,
  isImmutable = stubFalse,
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
    );
    if (!isChildPath(folderPath, pathname)) {
      return next(request);
    }
    let stats;
    try {
      stats = await stat(pathname);
    } catch (error) {
      if (error.code === "ENOENT") {
        return next(request);
      }
      throw error;
    }
    if (!stats.isFile()) {
      if (index != null && stats.isDirectory()) {
        return index(pathname, request);
      }
      return next(request);
    }
    const response = request.respond();
    if (isImmutable(pathname)) {
      response.setHeader(
        "Cache-Control",
        `public, immutable, max-age=${maxAge}, must-revalidate`,
      );
    } else if (lastModified && stats.mtime) {
      // Note that `no-cache` means that the client must revalidate with the server before using the cached resource
      response.setHeader("Cache-Control", "public, no-cache");
      const lastRequestDate = request.headers["if-modified-since"];
      if (
        lastRequestDate &&
        // The precision of `stats` is down to a millisecond while `lastRequestDate` is down to a second
        Date.parse(lastRequestDate) - stats.mtime.valueOf() > -1000
      ) {
        response.statusCode = STATUS_CODES.NOT_MODIFIED;
        return response;
      }
      response.setHeader("Last-Modified", stats.mtime.toUTCString());
    } else {
      response.setHeader("Cache-Control", "no-store");
    }
    const contentType = getContentType(pathname);
    if (contentType) {
      response.setHeader("Content-Type", contentType);
      if (contentType in compressibleContentTypes) {
        // Look for compressed version
        const acceptedEncodingList = getAcceptedEncodingList(
          request.headers["accept-encoding"],
        );
        const { length } = acceptedEncodingList;
        for (let i = 0; i < length; i++) {
          const acceptedEncoding = acceptedEncodingList[i];
          const compressedPathname = `${pathname}.${acceptedEncoding}`;
          try {
            const stats = await stat(compressedPathname);
            if (stats.isFile()) {
              response.body = createReadStream(compressedPathname);
              response.setHeader("Content-Length", stats.size);
              response.setHeader("Content-Encoding", acceptedEncoding);
              return response;
            }
          } catch (error) {
            // Ignore
          }
        }
      }
    }
    if (!response.compress) {
      response.setHeader("Content-Length", stats.size);
    }
    response.body = createReadStream(pathname);
    return response;
  };
}

const YEARS = 60 * 60 * 24 * 365;
