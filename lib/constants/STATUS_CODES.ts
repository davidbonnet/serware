import { STATUS_CODES as STATUS_CODE_NAMES } from "http";

import { snakeCase, toUpper } from "lodash-es";

const { parseInt } = global;

export const STATUS_CODES = Object.fromEntries(
  Object.entries(STATUS_CODE_NAMES).map((name, statusCode) => [
    toUpper(snakeCase(name)),
    parseInt(statusCode, 10),
  ]),
);
