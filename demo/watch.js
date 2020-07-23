import { join } from 'path'

import { reload } from '../src/reload'

function absolute(path) {
  return join(__dirname, path)
}

reload(absolute('./server.js'), ['../demo', '../src'].map(absolute))
