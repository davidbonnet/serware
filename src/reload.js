import { Worker } from "worker_threads";
import { join, dirname } from "path";

import { debounce } from "lodash-es";

const WORKER_MODULE = join(
  dirname(new URL(import.meta.url).pathname),
  "reloadWorker.js",
);

export function reload({ modulePath, watcher, onReload, delay = 1000 }) {
  let worker = null;
  async function reloadServer(modulePath) {
    if (worker) {
      await request(worker, "close");
      await terminate(worker);
    }
    worker = new Worker(WORKER_MODULE, {
      workerData: modulePath,
    });
    worker.on("error", (error) => {
      console.error(error);
      worker = null;
    });
    const response = await request(worker);
    if (response.type === "error") {
      console.error(response.value);
      await terminate(worker);
      worker = null;
    }
  }
  watcher.on("ready", async () => {
    await reloadServer(modulePath);
    watcher.on(
      "change",
      debounce(async (path) => {
        if (onReload) {
          onReload(path);
        }
        reloadServer(`${modulePath}`);
      }, delay),
    );
  });
}

async function request(worker, command) {
  const response = new Promise((resolve) => {
    worker.once("message", resolve);
  });
  if (command != null) {
    worker.postMessage(command);
  }
  return JSON.parse(await response);
}

async function terminate(worker) {
  try {
    return await worker.terminate();
  } catch (error) {
    // Ignore
  }
}
