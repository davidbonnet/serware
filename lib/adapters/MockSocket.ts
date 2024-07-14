import { Duplex } from "stream";

export class MockSocket extends Duplex {
  constructor() {
    super();
    this.bufferSize = 4096;
    this.bytesRead = 0;
    this.bytesWritten = 0;
    this.connecting = false;
    this.pending = false;
    this.localAddress = "127.0.0.1";
    this.localPort = 80;
    this.remoteAddress = "127.0.0.1";
    this.remoteFamily = "IPv4";
    this.remotePort = 80;
    this.chunks = [];
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    callback(null);
  }

  address() {
    return {
      port: 80,
      family: "IPv4",
      address: "127.0.0.1",
    };
  }

  // eslint-disable-next-line no-unused-vars
  connect(optionsOrPathOrPort, hostOrListener) {
    return this;
  }

  ref() {
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  setKeepAlive(enable = false, initialDelay = 0) {
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  setNoDelay(noDelay = true) {
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  setTimeout(delay, callback) {
    return this;
  }

  unref() {
    return this;
  }
}
