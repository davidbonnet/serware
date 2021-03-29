import { parentPort, workerData as modulePath } from 'worker_threads'

async function main() {
  const module = await import(modulePath)
  let close
  try {
    close = await Promise.resolve(module.default())
  } catch (error) {
    respond('error', error.toString())
    return
  }
  respond('success')
  parentPort.on('message', async (command) => {
    switch (command) {
      case 'close': {
        if (close) {
          await close()
        }
        respond('success')
        break
      }
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
