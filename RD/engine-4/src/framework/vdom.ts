import type { Props, VChild, VNode } from "./types";
import type { ComponentConstructor } from "./types";

/**
 * Create a Virtual DOM node.
 *
 * Usage:
 *   h("div", { className: "box" }, "Hello")
 *   h("ul", null, h("li", null, "Item 1"), h("li", null, "Item 2"))
 *   h(MyComponent, { title: "Hey" })
 *
 * @param type  - HTML tag name OR a Component class
 * @param props - Attributes / event handlers (null is fine)
 * @param children - Any number of child VNodes or strings
 */
export function h(
  type: string | ComponentConstructor,
  props?: Props | null,
  ...children: (VChild | VChild[] | null | undefined | boolean)[]
): VNode {
  // Flatten nested arrays and strip falsy values so callers can write:
  const flatChildren = children.flat(Infinity as 1).filter(
    // normalize children by removing null, undefined, false, and true values
    (c): c is VChild =>
      c !== null && c !== undefined && c !== false && c !== true,
  ) as VChild[];

  return {
    type,
    props: props ?? {},
    children: flatChildren,
    key: props?.key ?? null,
  };
}
