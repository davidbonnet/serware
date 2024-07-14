export type Request = globalThis.Request & {
  href?: URL;
  pathname?: URL["pathname"];
};
