// Turns VNodes into real DOM nodes and handles re-renders when state changes.
//
// Design: instead of diffing the DOM on every update (complex), each component
// fully replaces its own DOM subtree when it re-renders. This is simple to
// understand and fast enough for small apps.

import { Component } from "./component";
import type { VChild, VNode, Props } from "./types";

function isComponent(type: unknown): type is new (props: any) => Component {
  return typeof type === "function" && type.prototype instanceof Component;
}

// Write props/events onto a real DOM element.
function applyProps(el: Element, props: Props): void {
  for (const [key, val] of Object.entries(props)) {
    if (key === "key" || key === "children") continue;

    if (key.startsWith("on") && typeof val === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), val as EventListener);
    } else if (key === "className") {
      el.setAttribute("class", String(val));
    } else if (key === "style" && typeof val === "object") {
      Object.assign((el as HTMLElement).style, val);
    } else if (typeof val === "boolean") {
      val ? el.setAttribute(key, "") : el.removeAttribute(key);
    } else {
      el.setAttribute(key, String(val));
    }
  }
}

// Walk a DOM subtree and call componentWillUnmount() on any component
// instances found. Called before a subtree is discarded.
function teardown(node: Node): void {
  const instance = (node as any)._component as Component | undefined;
  if (instance) {
    instance.componentWillUnmount();
    // The instance manages its own subtree; no need to recurse further.
    return;
  }
  node.childNodes.forEach(teardown);
}

// Special VNode type string for raw HTML injection.
// Produced by `raw()` in vdom.ts — do not use this string directly.
export const RAW_HTML_TYPE = "__html";

// Build a real DOM node from a VChild (VNode, string, or number).
export function mount(vnode: VChild): Node {
  // Text / number → plain text node
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  const { type, props, children } = vnode;

  // Raw HTML → a transparent <span> wrapper with innerHTML set.
  // Use sparingly; the content is not sanitised.
  if (type === RAW_HTML_TYPE) {
    const wrapper = document.createElement("span");
    wrapper.innerHTML = (props.html as string) ?? "";
    return wrapper;
  }

  // Component → instantiate, render, wire up future re-renders
  if (isComponent(type)) {
    const instance = new type({ ...props, children });
    const ref = { node: mount(instance.render()) };
    (ref.node as any)._component = instance;

    instance._invalidate = () => {
      // Tear down any nested components in the old subtree
      ref.node.childNodes.forEach(teardown);
      // Build the new subtree and swap it in
      const next = mount(instance.render());
      ref.node.parentNode?.replaceChild(next, ref.node);
      ref.node = next;
    };

    queueMicrotask(() => instance.componentDidMount());
    return ref.node;
  }

  // Native element → create, apply props, mount children
  const el = document.createElement(type as string);
  applyProps(el, props);
  children.forEach((child) => el.appendChild(mount(child)));
  return el;
}

// Mount a root VNode into a container element.
// This is the main entry point for your app.
// @example
//   render(h(App, null), document.getElementById("root")!)
export function render(vnode: VChild, container: Element): void {
  // Teardown any previously rendered tree
  container.childNodes.forEach(teardown);
  container.innerHTML = "";
  container.appendChild(mount(vnode));
}
