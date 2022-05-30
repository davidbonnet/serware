import { Buffer } from "buffer";

import { isString } from "lodash-es";

import { isStream } from "./isStream.js";

const { isBuffer } = Buffer;

export async function toString(value, charset = "utf8") {
  if (isString(value)) {
    return value;
  }
  if (isBuffer(value)) {
    return value.toString(charset);
  }
  if (isStream(value)) {
    const bufferList = [];
    return new Promise((resolve, reject) => {
      value
        .on("data", (data) => bufferList.push(Buffer.from(data)))
        .on("error", (error) => reject(error))
        .on("end", () => resolve(Buffer.concat(bufferList).toString(charset)));
    });
  }
}
