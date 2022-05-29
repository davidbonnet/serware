import test from "ava";

import { combine } from "../combine.js";
import { ask } from "../ask.js";
import { writeBody } from "../writeBody.js";

test("writes body", async (assert) => {
  const handler = combine(writeBody, async (request, next) => {
    const response = await next(request);
    response.body = "Response body";
    return response;
  });
  const response = await ask(handler);
  assert.snapshot(await response.toString(), "matches");
});
