import { join } from 'path'
import chokidar from 'chokidar'

import { reload } from '../src/reload'

function absolute(path) {
  return join(__dirname, path)
}

reload(
  absolute('./server.js'),
  chokidar.watch(['../demo', '../src'].map(absolute), {
    ignored: /(^|[/\\])\../,
    persistent: true,
  }),
)
