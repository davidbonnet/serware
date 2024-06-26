import type { ComponentChildren } from "preact";

export type TextProps = {
  children: ComponentChildren;
};

export function Text({ children }: TextProps) {
  return <p>{children}</p>;
}
