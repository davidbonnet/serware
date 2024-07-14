export function toObject(headers) {
  if (typeof headers.entries === "function") {
    const result = {};
    for (const value of headers.entries()) {
      if (value[1] == null) {
        continue;
      }
      result[value[0]] = value[1];
    }
    return result;
  }
  return headers;
}
