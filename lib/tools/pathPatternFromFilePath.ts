import { parentName } from "./parentName.ts";

const PARAM_REGEXP = /(?<!\\)\$/g;

export function pathPatternFromFilePath(filePath: string) {
  return parentName(filePath, ".").replace(PARAM_REGEXP, ":");
}
