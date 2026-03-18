import type { VNode } from "./types";

export const h = <T extends keyof HTMLElementTagNameMap>(
  role: T,
  props: Partial<HTMLElementTagNameMap[T]>,
  children?: (VNode<keyof HTMLElementTagNameMap> | string)[],
): VNode<T> => {
  return {
    role,
    props,
    children,
  };
};
