import { promisify } from 'util'
import { pipeline as basePipeline } from 'stream'
import { stat as baseStat } from 'fs'
import { randomBytes as baseRandomBytes } from 'crypto'

export const pipeline = promisify(basePipeline)
export const stat = promisify(baseStat)
export const randomBytes = promisify(baseRandomBytes)
