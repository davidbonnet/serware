import { STATUS_CODES as STATUS_CODE_NAMES } from "http";

import { fromPairs, map, snakeCase, toUpper } from "lodash-es";

const { parseInt } = global;

export const STATUS_CODES = fromPairs(
  map(STATUS_CODE_NAMES, (name, statusCode) => [
    toUpper(snakeCase(name)),
    parseInt(statusCode, 10),
  ]),
);
