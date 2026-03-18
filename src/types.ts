export type VNode<T extends keyof HTMLElementTagNameMap> = {
  role: T;
  props: Partial<HTMLElementTagNameMap[T]> | GlobalEventHandlers;
  children?: (VNode<keyof HTMLElementTagNameMap> | string)[];
};
