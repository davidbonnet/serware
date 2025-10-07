export type Request = globalThis.Request & {
  href?: URL;
  pathname?: URL["pathname"];
  matches?: Record<string, string>;
  parameters?: URLSearchParams;
};
