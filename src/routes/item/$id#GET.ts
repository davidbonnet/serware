import type { Handler } from "#lib";

export default ((_request: Request) => new Response()) satisfies Handler;
