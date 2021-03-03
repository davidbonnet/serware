import { parentPort, workerData as modulePath } from 'worker_threads'

async function main() {
  let server
  try {
    const module = await import(modulePath)
    server = await Promise.resolve(module.default())
    respond('success')
  } catch (error) {
    respond('error', error.toString())
    return
  }
  parentPort.on('message', (command) => {
    switch (command) {
      case 'close':
        server.close(() => respond('success'))
        break
      default:
      // Ignore
    }
  })
}

function respond(type, value) {
  return parentPort.postMessage(
    JSON.stringify({
      type,
      value,
    }),
  )
}

main()
