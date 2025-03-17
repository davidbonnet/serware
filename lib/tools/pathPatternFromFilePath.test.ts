import { expect, test } from "vitest";

import { pathPatternFromFilePath } from "./pathPatternFromFilePath.js";

test("converts to path pattern", () => {
  expect(pathPatternFromFilePath("/path/$parameter/*settings.ts")).toBe(
    "/path/:parameter/*settings",
  );
});
