import test from "ava";

import { combine } from "../combine.js";
import { ask } from "../ask.js";
import { writeBody } from "../writeBody.js";
import { writeHeaders } from "../writeHeaders.js";
import { writeContentLength } from "../writeContentLength.js";
import { matchUrl } from "../matchUrl.js";
import { exact } from "../exact.js";
import { STATUS_CODES } from "../STATUS_CODES.js";

test("matches url patterns", async (assert) => {
  const handler = combine(
    writeBody,
    writeHeaders,
    writeContentLength,
    matchUrl(
      /^\/([a-z_]+)\/([0-9]+)/,
      ["project", "id"],
      exact((request) =>
        request.respond({
          body: JSON.stringify(request.matches, null, 2),
        }),
      ),
    ),
    (request) => request.respond({ statusCode: STATUS_CODES.NOT_FOUND }),
  );
  const responseA = await ask(handler, {
    url: "/serware/123",
  });
  assert.snapshot(await responseA.toString(), "matches the URL");
  const responseB = await ask(handler, {
    url: "/serware",
  });
  assert.snapshot(await responseB.toString(), "does not match the URL");
});
