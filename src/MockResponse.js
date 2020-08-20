import { ServerResponse } from 'http'
import { Buffer } from 'buffer'

export class MockResponse extends ServerResponse {
  constructor(request) {
    super(request)
    this.sendDate = false
  }

  async toString() {
    if (!this.writableFinished) {
      return await new Promise((resolve, reject) => {
        this.on('error', reject)
        this.on('finish', () => {
          resolve(toString(this.socket.chunks))
        })
      })
    }
    return toString(this.socket.chunks)
  }

  async toBinary() {
    if (!this.writableFinished) {
      return await new Promise((resolve, reject) => {
        this.on('error', reject)
        this.on('finish', () => {
          resolve(toBinary(this.socket.chunks))
        })
      })
    }
    return toBinary(this.socket.chunks)
  }
}

function toString(chunks) {
  return Buffer.concat(chunks).toString('utf8')
}

function toBinary(chunks) {
  const { length } = chunks
  let result = ''
  let headers = true
  for (let i = 0; i < length; i++) {
    const chunk = chunks[i]
    if (headers) {
      const string = chunk.toString('utf8')
      result += string
      if (string.indexOf('\r\n\r\n') !== -1) {
        headers = false
      }
      continue
    }
    result += chunk.toString('base64')
  }
  return result
}
