import test from "ava";

import { combine } from "../combine.js";
import { ask } from "../ask.js";
import { writeBody } from "../writeBody.js";
import { writeHeaders } from "../writeHeaders.js";
import { writeContentLength } from "../writeContentLength.js";
import { routeMethod } from "../routeMethod.js";
import { STATUS_CODES } from "../STATUS_CODES.js";

test("routes url", async (assert) => {
  const handler = combine(
    writeBody,
    writeHeaders,
    writeContentLength,
    routeMethod({
      GET: async (request) => {
        const response = await request.respond();
        response.body = "This is GET";
        return response;
      },
      POST: async (request) => {
        const response = await request.respond();
        response.body = "This is POST";
        return response;
      },
      PUT: async (request) => {
        const response = await request.respond();
        response.body = "This is PUT";
        return response;
      },
    }),
    (request) => {
      return request.respond({ statusCode: STATUS_CODES.METHOD_NOT_ALLOWED });
    },
  );
  const responseGET = await ask(handler, {
    method: "GET",
  });
  assert.snapshot(await responseGET.toString(), "matches GET");
  const responsePOST = await ask(handler, {
    method: "POST",
  });
  assert.snapshot(await responsePOST.toString(), "matches POST");
  const responsePUT = await ask(handler, {
    method: "PUT",
  });
  assert.snapshot(await responsePUT.toString(), "matches PUT");
  const responseDELETE = await ask(handler, {
    method: "DELETE",
  });
  assert.snapshot(await responseDELETE.toString(), "matches not allowed");
});
