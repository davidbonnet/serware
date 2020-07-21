export function isStream(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.pipe === 'function'
  )
}
