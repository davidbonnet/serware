export type Any =
  | boolean
  | string
  | number
  | object
  | symbol
  | null
  | undefined
  | Array<any>
  | ((...args: any[]) => any);
