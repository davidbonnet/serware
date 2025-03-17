import { expect, test } from "vitest";

import { sortedPathPatternList } from "./sortedPathPatternList.js";

test("sorts path pattern lists", () => {
  expect(
    sortedPathPatternList([
      "/item/:id",
      "/*any",
      "/item",
      "/item/:id/*children",
      "/item/index",
      "/item/0",
      "/item/0{/:version}",
      "/item/0{/metadata}",
      "/item/0{/0}",
      "/item/0{/:version}{/other}",
      "/item/0/test",
    ]),
  ).toMatchSnapshot();
});
