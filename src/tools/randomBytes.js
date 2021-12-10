import { promisify } from 'util'
import { randomBytes as baseRandomBytes } from 'crypto'

export const randomBytes = promisify(baseRandomBytes)
