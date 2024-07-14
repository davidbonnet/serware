import { workerData as modulePath, parentPort } from "worker_threads";

async function main() {
  const module = await import(modulePath);
  let close;
  try {
    close = await Promise.resolve(
      typeof module.default === "function"
        ? module.default()
        : module.default?.default &&
            typeof module.default.default === "function"
          ? module.default.default()
          : module(),
    );
  } catch (error) {
    respond("error", `${error.toString()}${error.stack ?? ""}`);
    return;
  }
  respond("success");
  parentPort.on("message", async (command) => {
    switch (command) {
      case "close": {
        if (close) {
          await close();
        }
        respond("success");
        break;
      }
      default:
      // Ignore
    }
  });
}

function respond(type, value) {
  return parentPort.postMessage(
    JSON.stringify({
      type,
      value,
    }),
  );
}

main();
