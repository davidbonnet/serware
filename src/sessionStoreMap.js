export function sessionStoreMap() {
  const sessions = new Map()
  return {
    async has(key) {
      return Promise.resolve(sessions.has(key))
    },
    async get(key) {
      return Promise.resolve(sessions.get(key))
    },
    async set(key, value) {
      sessions.set(key, value)
    },
    async delete(key) {
      sessions.delete(key)
    },
  }
}
