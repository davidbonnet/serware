import { randomBytes as baseRandomBytes } from "crypto";
import { promisify } from "util";

export const randomBytes = promisify(baseRandomBytes);
