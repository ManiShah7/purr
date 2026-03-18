import type { VNode } from "./types";

export const render = <T extends keyof HTMLElementTagNameMap>(
  vdom: VNode<T>,
  node: HTMLElement | null,
) => {
  if (!node) {
    throw new Error("Cannot find the specified node. Please ensure it exists.");
  }

  const element = document.createElement(vdom.role);
  Object.entries(vdom.props).forEach((prop) => {
    const isEvent = typeof prop[1] === "function";

    if (isEvent) {
      element.addEventListener(prop[0].slice(2, prop[0].length), prop[1]);
    } else {
      const att = document.createAttribute(prop[0]);
      att.value = prop[1];
      element.setAttributeNode(att);
    }
  });

  if (vdom.children) {
    vdom.children.forEach((child) => {
      if (typeof child === "string") {
        const textNode = document.createTextNode(child);
        element.appendChild(textNode);
      } else {
        render(child, element);
      }
    });
  }

  node.appendChild(element);
  return element;
};

// render(
//   {
//     role: "div",
//     props: { id: "app" },
//     children: [
//       {
//         role: "h1",
//         props: {},
//         children: ["Hello, Purr!"],
//       },
//       {
//         role: "button",
//         props: { onclick: (e) => "alert('Button clicked!')" },
//         children: ["This is a simple virtual DOM implementation."],
//       },
//     ],
//   },
//   document.getElementById("app"),
// );
