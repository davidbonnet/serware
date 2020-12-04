import { relative, isAbsolute } from 'path'

export function isChildPath(parent, current) {
  const path = relative(parent, current)
  return path && !path.startsWith('..') && !isAbsolute(path)
}
