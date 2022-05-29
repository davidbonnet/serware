export function getAcceptedEncoding(acceptEncoding) {
  switch (true) {
    case !acceptEncoding:
      return undefined;
    case GZIP_REGEXP.test(acceptEncoding):
      return GZIP;
    case BR_REGEXP.test(acceptEncoding):
      return BR;
    default:
      return undefined;
  }
}

export const GZIP = "gzip";
export const GZIP_REGEXP = /\bgzip\b/i;

export const BR = "br";
export const BR_REGEXP = /\bbr\b/i;
