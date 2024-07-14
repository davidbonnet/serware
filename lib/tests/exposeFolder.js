import { join, dirname } from "path";

import test from "ava";

import { combine } from "../combine.js";
import { ask } from "../ask.js";
import { exposeFolder } from "../exposeFolder.js";
import { writeBody } from "../writeBody.js";
import { writeHeaders } from "../writeHeaders.js";
import { STATUS_CODES } from "../STATUS_CODES.js";

test("exposes folder", async (assert) => {
  const handler = combine(
    writeBody,
    writeHeaders,
    exposeFolder({
      path: join(
        dirname(new URL(import.meta.url).pathname),
        "./fixtures/files",
      ),
      cache: false,
      lastModified: false,
    }),
    (request) => request.respond({ statusCode: STATUS_CODES.NOT_FOUND }),
  );
  const response1 = await ask(handler, {
    url: "/data.json",
  });
  assert.snapshot(await response1.toString(), "returns json file");
  const response2 = await ask(handler, {
    url: "/page.html",
  });
  assert.snapshot(await response2.toString(), "returns html file");
  const response3 = await ask(handler, {
    url: "/data.json",
    headers: {
      "accept-encoding": "br,gzip",
    },
  });
  assert.snapshot(await response3.toBinary(), "returns compressed json file");
  const response4 = await ask(handler, {
    url: "/missing.file",
    headers: {
      "accept-encoding": "br,gzip",
    },
  });
  assert.snapshot(await response4.toString(), "returns not found");
  const response5 = await ask(handler, {
    url: "/Example%20Text.txt",
  });
  assert.snapshot(await response5.toString(), "returns txt file");
});
