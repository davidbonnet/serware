import type { Handler, Request } from "#lib";

export const handler: Handler = (request: Request) => {
  const result = "OK";
  return new Response(result);
};

export default ((a: number) => ({ a: 3 })) satisfies Handler;
