// Adapted from `raw-body` by Jonathan Ong & Douglas Christopher Wilson

import { Buffer } from "buffer";

import iconvLite from "iconv-lite";
const { getDecoder: baseGetDecoder } = iconvLite;

import { HTTPError } from "./HTTPError.js";

export function parseBody(
  request,
  encoding = "utf-8",
  contentLength = null,
  limit = null,
) {
  return new Promise(function (resolve, reject) {
    readStream(request, encoding, contentLength, limit, resolve, reject);
  });
}

const ICONV_ENCODING_MESSAGE_REGEXP = /^Encoding not recognized: /;

function getDecoder(encoding) {
  if (!encoding) {
    return null;
  }
  try {
    return baseGetDecoder(encoding);
  } catch (error) {
    if (!ICONV_ENCODING_MESSAGE_REGEXP.test(error.message)) {
      throw error;
    }
    throw new HTTPError(415, `Specified encoding is unsupported: ${encoding}`);
  }
}

function readStream(request, encoding, contentLength, limit, resolve, reject) {
  let complete = false;
  let sync = true;

  if (limit != null && contentLength != null && contentLength > limit) {
    done(
      new HTTPError(
        413,
        `Request entity too large: got ${contentLength} while limit is ${limit}`,
      ),
    );
  }
  const state = request._readableState;
  if (request._decoder || (state && (state.encoding || state.decoder))) {
    done(new HTTPError(500, "Stream encoding should not be set"));
  }

  let received = 0;
  let decoder;
  try {
    decoder = getDecoder(encoding);
  } catch (error) {
    return done(error);
  }

  let buffer = decoder ? "" : [];
  request.on("aborted", onAborted);
  request.on("close", cleanup);
  request.on("data", onData);
  request.on("end", onEnd);
  request.on("error", onEnd);

  sync = false;

  function done(error, buffer) {
    complete = true;
    if (sync) {
      process.nextTick(invokeCallback);
    } else {
      invokeCallback();
    }
    function invokeCallback() {
      cleanup();
      if (error) {
        request.unpipe().pause();
        reject(error);
        return;
      }
      resolve(buffer);
    }
  }

  function onAborted() {
    if (complete) {
      return;
    }
    done(new HTTPError(400, "Request aborted"));
  }

  function onData(chunk) {
    if (complete) {
      return;
    }
    received += chunk.length;
    if (limit !== null && received > limit) {
      done(
        new HTTPError(
          413,
          `Request entity too large: got ${received} while limit is ${limit}`,
        ),
      );
    } else if (decoder) {
      buffer += decoder.write(chunk);
    } else {
      buffer.push(chunk);
    }
  }

  function onEnd(error) {
    if (complete) {
      return;
    }
    if (error) {
      return done(error);
    }
    if (contentLength != null && received !== contentLength) {
      return done(
        new HTTPError(
          400,
          `Request size did not match content length: got ${received} while expected ${contentLength}`,
        ),
      );
    }
    const string = decoder
      ? buffer + (decoder.end() || "")
      : Buffer.concat(buffer);
    done(null, string);
  }

  function cleanup() {
    buffer = null;
    request.removeListener("aborted", onAborted);
    request.removeListener("data", onData);
    request.removeListener("end", onEnd);
    request.removeListener("error", onEnd);
    request.removeListener("close", cleanup);
  }
}
