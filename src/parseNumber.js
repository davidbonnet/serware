export function parseNumber(value) {
  const result = parseInt(value, 10)
  if (isNaN(result)) {
    return null
  }
  return result
}
