import type { Handler, Request } from "#lib";

export default ((request: Request) =>
  Response.json({
    data: `Item data for ${request.matches?.id}`,
  })) satisfies Handler;
