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
          resolve(Buffer.concat(this.socket.chunks).toString('utf8'))
        })
      })
    }
    return Buffer.concat(this.socket.chunks).toString('utf8')
  }
}
