export function parentName(value: string, separator = "/") {
  return value.slice(0, value.lastIndexOf(separator));
}
