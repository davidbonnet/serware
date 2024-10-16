import { Server as HTTPServer } from "http";
import { dirname, join } from "path";

import pino from "pino";
import { WebSocketServer } from "ws";

import {
  STATUS_CODES,
  cache,
  combine,
  exact,
  exposeFolder,
  getSessionValue,
  handleError,
  log,
  matchUrl,
  onRequest,
  onUpgrade,
  parseBodyJson,
  routeMethod,
  routeUrl,
  session,
  setCookie,
  setHref,
  setSessionValue,
  withContentType,
  withHtml,
  withJson,
  writeCompressibleBody,
  writeContentEncoding,
  writeContentLength,
  writeCookies,
  writeHeaders,
} from "../main.js";

const logger = pino({
  level: "debug",
  prettyPrint:
    process.env.NODE_ENV !== "production"
      ? {
          translateTime: true,
        }
      : false,
});

const {
  stdSerializers: {
    req: serializeRequest,
    res: serializeResponse,
    err: serializeError,
  },
} = pino;

async function test(request) {
  const response = request.respond(
    withHtml("<body><h1>Test page</h1><p>It just sets two cookies</p></body>"),
  );
  setCookie(response, "test", "42", {
    expires: new Date(Date.now() + 10000),
    httpOnly: true,
    sameSite: "lax",
  });
  setCookie(response, "test2", "84", {
    expires: new Date(Date.now() + 20000),
  });
  return response;
}

async function printPath(request) {
  return request.respond(
    withHtml(
      `<body><h1>Print path</h1><p>Got pathname: "${request.pathname}"</p></body>`,
    ),
  );
}

function printMessage(message, contentType = "text/plain", compress) {
  return function (request) {
    const response = request.respond(
      withContentType(
        contentType,
        typeof message === "function" ? message(request) : message,
      ),
    );
    response.compress = compress;
    return response;
  };
}

function printHtmlMessage(title, body = "", compress) {
  return function (request, next) {
    return printMessage(
      `<html><head><title>${title}</title></head><body><h1>${title}</h1>${body}</body></html>`,
      "text/html",
      compress,
    )(request, next);
  };
}

const SESSIONS = new Map();
const { stringify: formatJson } = JSON;

const sessionStore = {
  delete(key) {
    SESSIONS.delete(key);
  },
  get(key) {
    return Promise.resolve(SESSIONS.get(key));
  },
  set(key, value) {
    SESSIONS.set(key, value);
  },
};

const CACHE = new Map();

const cacheStore = {
  async get(request) {
    return Promise.resolve(CACHE.get(request.url));
  },
  async has(request) {
    return Promise.resolve(CACHE.has(request.url));
  },
  async set(request, response) {
    if (response == null) {
      CACHE.delete(request.url);
      return;
    }
    CACHE.set(request.url, response);
  },
};

const LINKS = [
  {
    href: "/files/page.html",
    label: "Html test page with a picture",
  },
  {
    href: "/test",
    label: "Test page",
  },
  {
    href: "/project/123",
    label: "Match URL example",
  },
  {
    href: "/sessions",
    label: "Current sessions",
  },
  {
    href: "/counter",
    label: "Create session",
  },
  {
    href: "/refresh-session",
    label: "Refresh current session",
  },
  {
    href: "/clear",
    label: "Clear current session",
  },
];

const webSocketServer = new WebSocketServer({
  clientTracking: true,
  noServer: true,
});

const handle = combine(
  log({
    request(request) {
      const log = logger.child(serializeRequest(request));
      request.log = log;
      return log;
    },
    response(response, log) {
      log.info({ response: serializeResponse(response) });
    },
  }),
  handleError({
    callback(error, request) {
      request.log.error(serializeError(error));
    },
  }),
  writeCompressibleBody,
  writeHeaders,
  writeContentLength,
  cache({
    shouldCache(request) {
      return setHref(request).pathname.startsWith("/a");
    },
    store: cacheStore,
  }),
  writeContentEncoding,
  writeCookies,
  session({
    store: sessionStore,
  }),
  routeUrl({
    "/": exact(
      printHtmlMessage(
        "Index",
        `<ul>${LINKS.map(
          (link) => `<li><a href="${link.href}">${link.label}</a></li>`,
        ).join("")}</ul>`,
        true,
        true,
      ),
    ),
    "/a": routeUrl({
      "": printHtmlMessage("This is the first page A"),
      "/b": exact(routeMethod({ GET: printHtmlMessage("This is a/b") })),
      "/b2": printPath,
      "/c": routeMethod({ POST: printHtmlMessage("This is a/b") }),
    }),
    "/clear": exact(async (request, next) => {
      const response = await next(request);
      request.session = null;
      response.body = "Cleared the session";
      return response;
    }),
    "/counter": exact(async (request, next) => {
      const response = await next(request);
      const counter = getSessionValue(request, "counter", 0) + 1;
      setSessionValue(request, "counter", counter);
      response.body = `Visited this page ${counter} times`;
      return response;
    }),
    "/data": exact(
      combine(
        routeMethod({
          POST: async (request) => {
            const data = await parseBodyJson(request, 1024 * 1024);
            return request.respond(withJson({ result: data, status: "OK" }));
          },
        }),
        (request) =>
          request.respond({ statusCode: STATUS_CODES.METHOD_NOT_ALLOWED }),
      ),
    ),
    "/files": exposeFolder({
      maxAge: 0,
      path: join(dirname(new URL(import.meta.url).pathname), "files"),
    }),
    "/hello": exact(printMessage("Hello there")),
    "/refresh-session": exact(
      combine(async (request, next) => {
        const response = await next(request);
        response.refreshSession = true;
        return response;
      }, printMessage("Session is refreshed for 7 more days")),
    ),
    "/sessions": exact(
      printMessage(() =>
        formatJson(Object.fromEntries(SESSIONS.entries()), null, 2),
      ),
    ),
    "/test": exact(test),
    "/ws": exact(async (request) => {
      if (request.session == null) {
        return request.respond({ statusCode: STATUS_CODES.FORBIDDEN });
      }
      const heartbeat = getSessionValue(request, "heartbeat");
      if (heartbeat != null) {
        global.clearInterval(heartbeat);
      }
      const webSocket = await request.connect(webSocketServer);
      webSocket.send("Hello!");
      const newHeartbeat = setSessionValue(
        request,
        "heartbeat",
        global.setInterval(() => {
          webSocket.send("Heartbeat");
        }, 2000),
      );
      webSocket.on("close", () => {
        global.clearInterval(newHeartbeat);
      });
      return request.respond();
    }),
  }),
  matchUrl(/^\/([a-z_]+)\/([0-9]+)$/, ["project", "id"], (request) =>
    request.respond(withJson(request.matches)),
  ),
  printHtmlMessage("Page not found", "", false),
);

export default function main() {
  const server = new HTTPServer();
  server.on("request", onRequest(handle));
  server.on("upgrade", onUpgrade(handle));
  server.on("clientError", (error, socket) => {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  });
  server.on("close", () => {
    logger.info("Stopping server…");
    webSocketServer.close();
  });
  server.keepAliveTimeout = 5000;
  server.listen(9000);
  logger.info("Listening on http://localhost:9000");
  return server;
}
