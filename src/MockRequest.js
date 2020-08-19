import { Readable } from 'stream'

export class MockRequest extends Readable {
  constructor(
    { method = 'GET', headers = {}, url = '/', cookies, body = null } = {},
    socket = null,
  ) {
    super()
    this.aborted = false
    this.complete = true
    this.headers = headers
    this.httpVersion = '1.1'
    this.httpVersionMajor = 1
    this.httpVersionMinor = 1
    this.method = method
    this.rawHeaders = []
    this.rawTrailers = []
    this.socket = socket
    this.connection = socket
    this.trailers = {}
    this.url = url
    // Custom properties
    this.cookies = cookies
    this.body = body
  }

  _read() {
    this.push(this.body)
    if (this.body != null) {
      this.push(null)
    }
  }

  // eslint-disable-next-line no-unused-vars
  destroy(error) {}

  setTimeout(delay, callback) {
    this.connection.setTimeout(delay, callback)
    return this
  }
}
