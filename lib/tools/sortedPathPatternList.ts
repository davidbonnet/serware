import { type Token, parse } from "path-to-regexp";

export function sortedPathPatternList(pathPatternList: string[]) {
  return pathPatternList
    .map((pathPattern) => ({
      tokenList: parse(pathPattern).tokens,
      pathPattern,
    }))
    .sort(({ tokenList: a }, { tokenList: b }) => compareTokenList(a, b))
    .map(({ pathPattern }) => pathPattern);
}

function compareTokenList(a: readonly Token[], b: readonly Token[]) {
  let i = 0;
  let result = 0;
  while (result === 0 && a[i] != null && b[0] != null) {
    result = compareToken(a[i], b[i]);
    i += 1;
  }
  return result;
}

function compareToken(a: Token | undefined, b: Token | undefined): number {
  if (a == null) {
    return b == null ? 0 : 1;
  }
  if (b == null) {
    return -1;
  }
  switch (a.type) {
    case "text":
      switch (b.type) {
        case "text":
          return b.value.length - a.value.length;
        case "group":
          return compareTokenList([a], b.tokens);
        case "param":
        case "wildcard":
        default:
          return -1;
      }
    case "param":
      switch (b.type) {
        case "text":
          return 1;
        case "param":
          return 0;
        case "group":
          return compareTokenList([a], b.tokens);
        case "wildcard":
          return -1;
        default:
          return 0;
      }
    case "group":
      switch (b.type) {
        case "text":
        case "param":
        case "wildcard":
          return compareTokenList(a.tokens, [b]);
        case "group":
          return compareTokenList(a.tokens, b.tokens);
        default:
          return 0;
      }
    case "wildcard":
      switch (b.type) {
        case "text":
        case "param":
          return 1;
        case "group":
          return compareTokenList([a], b.tokens);
        case "wildcard":
        default:
          return 0;
      }
    default:
      return 0;
  }
}
