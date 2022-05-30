import { join, dirname } from "path";

import chokidar from "chokidar";

import { reload } from "../src/reload.js";

function absolute(path) {
  return join(dirname(new URL(import.meta.url).pathname), path);
}

reload({
  modulePath: absolute("./server.js"),
  watcher: chokidar.watch(["../demo", "../src"].map(absolute), {
    ignored: /(^|[/\\])\../,
    persistent: true,
  }),
});
