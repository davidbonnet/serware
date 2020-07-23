import chokidar from 'chokidar'

export function reload(modulePath, observedPaths) {
  const watcher = chokidar.watch(observedPaths, {
    ignored: /(^|[/\\])\../,
    persistent: true,
  })
  let server = null
  let reloads = 0
  async function reloadServer(modulePath) {
    if (server) {
      await new Promise((resolve, reject) => {
        try {
          server.close(resolve)
        } catch (error) {
          reject(error)
        }
      })
    }
    const module = await import(modulePath)
    server = module.default()
  }
  watcher.on('ready', async () => {
    reloadServer(modulePath)
    watcher.on('change', (path) => {
      // eslint-disable-next-line no-console
      console.log(`Reloading after update on "${path}"…`)
      reloadServer(`${modulePath}?r=${++reloads}`)
    })
  })
}
