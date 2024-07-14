import { Server as HTTPServer } from "http";

import {
  combine,
  onRequest,
  withText,
  writeCompressibleBody,
  writeContentLength,
  writeHeaders,
} from "../lib/main.js";

const handle = combine(
  writeCompressibleBody,
  writeHeaders,
  writeContentLength,
  (request) => request.respond(withText("Hello")),
);

function main() {
  const server = new HTTPServer();
  server.on("request", onRequest(handle));
  server.on("clientError", (error, socket) => {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  });
  server.on("close", () => {
    console.log("Stopping server…");
  });
  server.keepAliveTimeout = 5000;
  server.listen(9000);
  console.log("Listening on http://localhost:9000");
  return server;
}

main();
