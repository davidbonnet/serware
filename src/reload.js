import { Worker } from 'worker_threads'
import { join } from 'path'

import { debounce } from 'lodash'
import chokidar from 'chokidar'

const WORKER_MODULE = join(__dirname, 'reloadWorker.js')

export function reload(modulePath, observedPaths) {
  const watcher = chokidar.watch(observedPaths, {
    ignored: /(^|[/\\])\../,
    persistent: true,
  })
  let worker = null
  async function reloadServer(modulePath) {
    if (worker) {
      await request(worker, 'close')
      await worker.terminate()
    }
    worker = new Worker(WORKER_MODULE, {
      workerData: modulePath,
    })
    const response = await request(worker)
    if (response.type === 'error') {
      console.error(response.value)
      await worker.terminate()
      worker = null
    }
  }
  watcher.on('ready', async () => {
    await reloadServer(modulePath)
    watcher.on(
      'change',
      debounce(async (path) => {
        // eslint-disable-next-line no-console
        console.log(`Reloading after update on "${path}"…`)
        reloadServer(`${modulePath}`)
      }, 1000),
    )
  })
}

async function request(worker, command) {
  const response = new Promise((resolve) => {
    worker.once('message', resolve)
  })
  if (command != null) {
    worker.postMessage(command)
  }
  return JSON.parse(await response)
}
