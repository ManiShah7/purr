// export type VNode<T extends keyof HTMLElementTagNameMap> = {
//   role: T;
//   props: Partial<HTMLElementTagNameMap[T]> | GlobalEventHandlers;
//   children?: (VNode<keyof HTMLElementTagNameMap> | string)[];
// };

import { render } from "./render";
import type { VNode } from "./types";

const diff = <T extends keyof HTMLElementTagNameMap>(
  node: HTMLElement,
  original: VNode<T>,
  changed: VNode<T>,
) => {
  if (original.role !== changed.role) {
    return render(changed, node);
  }
};

const compareTwoProps = <T extends keyof HTMLElementTagNameMap>(
  originalProps: VNode<T>["props"],
  changedProps: VNode<T>["props"],
): VNode<T>["props"] => {
  type Props = VNode<T>["props"];

  const added = Object.keys(changedProps).filter(
    (key) => !(key in originalProps),
  );
  const deleted = Object.keys(originalProps).filter(
    (key) => !(key in changedProps),
  );
  const updated = Object.keys(changedProps).filter(
    (key) =>
      key in originalProps &&
      originalProps[
        key as keyof (GlobalEventHandlers | Partial<HTMLElementTagNameMap[T]>)
      ] !==
        changedProps[
          key as keyof (GlobalEventHandlers | Partial<HTMLElementTagNameMap[T]>)
        ],
  );

  return {};
};
