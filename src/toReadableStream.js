import { Readable } from "stream";
import { Buffer } from "buffer";

import { isStream } from "./isStream.js";

const { isBuffer } = Buffer;

export function toReadableStream(value, charset) {
  if (isStream(value)) {
    return value;
  }
  if (isBuffer(value)) {
    return new Readable({
      read() {
        this.push(value);
        this.push(null);
      },
    });
  }
  return Readable.from(value, {
    objectMode: false,
    encoding: charset,
  });
}
