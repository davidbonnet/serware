export function keyTransform(transform) {
  return (store) => ({
    set(key, value) {
      return store.set(transform(key), value)
    },
    has(key) {
      return store.has(transform(key))
    },
    get(key) {
      return store.get(transform(key))
    },
    delete(key) {
      return store.delete(transform(key))
    },
  })
}
