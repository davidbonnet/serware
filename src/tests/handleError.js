import test from "ava";

import { combine } from "../combine.js";
import { ask } from "../ask.js";
import { handleError } from "../handleError.js";
import { MockResponse } from "../MockResponse.js";
import { HTTPError } from "../HTTPError.js";

test("handles error", async (assert) => {
  const handler = combine(
    handleError({
      Response: MockResponse,
      callback(response, error) {
        response.body = error.toString();
        return response;
      },
    }),
    () => {
      throw new Error("Some error occurred");
    },
  );
  const response = await ask(handler);
  assert.snapshot(await response.toString(), "matches");
});

test("returns error by default", async (assert) => {
  const handler = combine(
    handleError({
      Response: MockResponse,
    }),
    () => {
      throw new HTTPError(404);
    },
  );
  const response = await ask(handler);
  assert.snapshot(await response.toString(), "matches");
});
