// h() is the equivalent of React.createElement().
//
// Usage:
//   h("div", { className: "box" }, "Hello")
//   h(MyComponent, { title: "Hey" })
//   h("ul", null, items.map(i => h("li", null, i)))

import { RAW_HTML_TYPE } from "./renderer";
import type { Props, VChild, VNode } from "./types";

// Inject a raw HTML string directly into the DOM.
// The content is NOT sanitised — only use with trusted input.
// Produces a `<span>` wrapper node whose innerHTML is set to the given string.
// @example
//   raw("<strong>Hello</strong> <em>world</em>")
//   raw(markdownToHtml(post.body))
export function raw(html: string): VNode {
  return { type: RAW_HTML_TYPE, props: { html }, children: [], key: null };
}

export function h(
  type: VNode["type"],
  props?: Props | null,
  ...children: (VChild | VChild[] | null | undefined | boolean)[]
): VNode {
  return {
    type,
    props: props ?? {},
    children: (
      children.flat(Infinity) as (VChild | null | undefined | boolean)[]
    ).filter(
      (c): c is VChild =>
        c !== null && c !== undefined && c !== false && c !== true,
    ),
    key: props?.key ?? null,
  };
}
