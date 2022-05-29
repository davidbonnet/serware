import test from "ava";

import { combine } from "../combine.js";
import { ask } from "../ask.js";
import { writeBody } from "../writeBody.js";
import { writeHeaders } from "../writeHeaders.js";
import { writeContentLength } from "../writeContentLength.js";

test("writes content length", async (assert) => {
  const handler = combine(
    writeBody,
    writeHeaders,
    writeContentLength,
    async (request, next) => {
      const response = await next(request);
      response.body = "Should be 13.";
      return response;
    },
  );
  const response = await ask(handler);
  assert.snapshot(await response.toString(), "matches");
});
