// ============================================================
//  MiniAct – Renderer
//  This file is the specific engine that takes our "Virtual DOM" (fake elements)
//  and turns them into real HTML elements that the browser can display.
//  It also handles updating the screen when things change (called "diffing" or "reconciliation").
// ============================================================

import { Component } from "./component";
import type { Props, VChild, VNode, ComponentConstructor } from "./types";

// ── 1. Hidden Metadata Layer ────────────────────────────────────────────────
// We use `WeakMap` to attach hidden information to real DOM elements.
// Think of WeakMaps like sticky notes on physical objects.
// If the object (the real HTML element) gets thrown away in the trash,
// the sticky note (our hidden data) automatically gets thrown away too.
// This prevents memory leaks!

/** Remembers the blueprint (VNode) that created a specific DOM element. Used to know what changed later. */
const domVNode = new WeakMap<Node, VChild>();

/** Remembers which Component (like a smart piece of UI) owns a specific DOM element. */
const domComponent = new WeakMap<Node, Component>();

/** Keeps track of event listeners (like 'onClick' functions) attached to a DOM element, so we can remove them safely later. */
const domListeners = new WeakMap<Element, Record<string, EventListener>>();

// ── 2. Type Guards & Helpers ────────────────────────────────────────────────

/**
 * A helper to check if something is a Custom Component (like 'MyButton')
 * or just a standard HTML tag (like 'div' or 'span').
 */
function isComponentClass(type: unknown): type is ComponentConstructor {
  return typeof type === "function" && type.prototype instanceof Component;
}

function getRawHtmlFromVChildren(children: VChild[]): string {
  let html = "";
  for (const child of children) {
    if (typeof child === "string" || typeof child === "number") {
      html += String(child);
    }
  }
  return html;
}

function createDomFromRawHtml(html: string): Node {
  const template = document.createElement("template");
  template.innerHTML = html;

  const content = template.content;
  if (content.childNodes.length === 1) {
    return content.firstChild!;
  }

  const wrapper = document.createElement("div");
  while (content.firstChild) wrapper.appendChild(content.firstChild);
  return wrapper;
}

// ── 3. DOM Property Management ──────────────────────────────────────────────

/**
 * Takes properties like `className`, `id`, or `onClick` from our Virtual DOM
 * and applies them to the real HTML elements in the browser.
 */
export function applyProps(
  el: Element,
  oldProps: Props,
  newProps: Props,
): void {
  const listeners = domListeners.get(el) ?? {};

  // Step 1: Cleaning up. Remove old properties that are no longer needed.
  for (const key of Object.keys(oldProps)) {
    if (
      key === "key" ||
      key === "children" ||
      key === "innerHTML" ||
      key in newProps
    )
      continue;

    if (key.startsWith("on")) {
      // If it's an event like "onClick", remove the old event listener
      const event = key.slice(2).toLowerCase();
      if (listeners[event]) {
        el.removeEventListener(event, listeners[event]);
        delete listeners[event];
      }
    } else if (key === "className") {
      el.removeAttribute("class");
    } else {
      el.removeAttribute(key); // Remove regular HTML attributes
    }
  }

  // Step 2: Set the new properties or update the existing ones
  for (const [key, value] of Object.entries(newProps)) {
    if (key === "key" || key === "children" || key === "innerHTML") continue;

    if (key.startsWith("on") && typeof value === "function") {
      // Add new event listeners (like click or input events)
      const event = key.slice(2).toLowerCase();
      // Only re-bind if the actual function changed
      if (listeners[event] !== value) {
        if (listeners[event]) el.removeEventListener(event, listeners[event]);
        el.addEventListener(event, value as EventListener);
        listeners[event] = value as EventListener;
      }
    } else if (key === "className") {
      el.setAttribute("class", value as string);
    } else if (key === "style" && typeof value === "object") {
      Object.assign((el as HTMLElement).style, value);
    } else if (typeof value === "boolean") {
      // For boolean attributes like 'disabled', it either exists or it doesn't
      value ? el.setAttribute(key, "") : el.removeAttribute(key);
    } else {
      el.setAttribute(key, String(value));
    }
  }

  // Save the updated sticky note of event listeners back onto the element
  domListeners.set(el, listeners);
}

// ── 4. Mounting (First Render) ──────────────────────────────────────────────

/**
 * The "construction worker" function. It reads our Virtual DOM blueprints
 * and builds the actual HTML tree that you see on the screen.
 * It is called recursively (it calls itself to build children inside children).
 */
export function createDom(vnode: VChild): Node {
  // Case 1: The blueprint is just plain text or a number
  if (typeof vnode === "string" || typeof vnode === "number") {
    const text = document.createTextNode(String(vnode));
    domVNode.set(text, vnode); // Write our sticky note
    return text;
  }

  const { type, props, children } = vnode;

  // Raw HTML injection (opt-in). Example:
  //   h("<HTML>", null, "<div><b>Hi</b></div>")
  // Treated as a leaf node: the engine does not diff inside it.
  if (type === "<HTML>") {
    const html = getRawHtmlFromVChildren(children);
    const dom = createDomFromRawHtml(html);
    if (dom.nodeType === Node.ELEMENT_NODE) {
      applyProps(dom as Element, {}, props);
    }
    domVNode.set(dom, vnode);
    return dom;
  }

  // Case 2: The blueprint is a custom Component (e.g., <MyButton />)
  if (isComponentClass(type)) {
    const Ctor = type as ComponentConstructor;
    // Create the "brain" (the instance) for this component
    const instance = new Ctor({ ...props, children });

    // Let the component decide what it wants to look like
    const renderedVNode = instance.render();
    instance._renderedVNode = renderedVNode;

    // Actually build what it looks like
    const dom = createDom(renderedVNode) as Element;
    instance._root = dom;

    // Give the component a way to update itself on the screen later when its state changes
    instance._doReconcile = () => {
      if (!instance._root || !instance._renderedVNode) return;

      const newVNode = instance.render(); // What it should look like now
      const parent = instance._root.parentNode as Node;
      // Patch the screen to match the new look
      const newRoot = patchDOM(
        parent,
        instance._root,
        instance._renderedVNode,
        newVNode,
      );

      instance._root = newRoot as Element;
      instance._renderedVNode = newVNode;
    };

    domComponent.set(dom, instance);
    domVNode.set(dom, vnode);

    // Tell the component it just got put on the screen (lifecycle)
    queueMicrotask(() => instance.componentDidMount());
    return dom;
  }

  // Case 3: The blueprint is a regular HTML element (e.g., <div>, <span>)
  const el = document.createElement(type as string);
  domVNode.set(el, vnode);
  applyProps(el, {}, props); // Apply all the properties (classes, ids, styles)

  if (props.innerHTML != null) {
    (el as HTMLElement).innerHTML = String(props.innerHTML);
    return el;
  }

  // Recursively build and add all the children inside this element
  for (const child of children) {
    el.appendChild(createDom(child));
  }

  return el;
}

// ── 5. Reconciliation (Diffing) ─────────────────────────────────────────────

/**
 * The "smart updater". Instead of throwing away the whole webpage and rebuilding it (which is slow),
 * this function compares the old blueprint with the new blueprint and only edits
 * the exact HTML elements that have actually changed.
 */
export function patchDOM(
  parent: Node,
  oldDom: Node,
  oldVNode: VChild,
  newVNode: VChild,
): Node {
  const oldIsText =
    typeof oldVNode === "string" || typeof oldVNode === "number";
  const newIsText =
    typeof newVNode === "string" || typeof newVNode === "number";

  // Rule 1: It was text, and it's still text. Just change the words if needed!
  if (oldIsText && newIsText) {
    if (String(oldVNode) !== String(newVNode)) {
      oldDom.textContent = String(newVNode);
    }
    domVNode.set(oldDom, newVNode);
    return oldDom;
  }

  // Rule 2: We changed from text to an HTML element (or vice versa). Destroy the old and put the new.
  if (oldIsText !== newIsText) return replaceNode(parent, oldDom, newVNode);

  const oldV = oldVNode as VNode;
  const newV = newVNode as VNode;

  // Rule 3: The HTML tag completely changed (e.g. <div> became a <span>). Destroy the old, build the new.
  if (oldV.type !== newV.type) return replaceNode(parent, oldDom, newVNode);

  // Raw HTML injection: treat it as a leaf node and replace when it changes.
  if (newV.type === "<HTML>") {
    const oldHtml = getRawHtmlFromVChildren(oldV.children);
    const newHtml = getRawHtmlFromVChildren(newV.children);
    if (oldHtml === newHtml) {
      if (oldDom.nodeType === Node.ELEMENT_NODE) {
        applyProps(oldDom as Element, oldV.props, newV.props);
      }
      domVNode.set(oldDom, newV);
      return oldDom;
    }
    return replaceNode(parent, oldDom, newVNode);
  }

  // Rule 4: It's the exact same custom Component. Just give it the new properties (props).
  if (isComponentClass(newV.type)) {
    const instance = domComponent.get(oldDom);
    if (!instance) return replaceNode(parent, oldDom, newVNode);

    const prevProps = instance.props;
    instance.props = { ...newV.props, children: newV.children };

    // Only force it to re-draw if its new properties are actually different
    if (JSON.stringify(prevProps) !== JSON.stringify(instance.props)) {
      instance._doReconcile?.();
    }
    return instance._root!;
  }

  // Rule 5: It's the same regular HTML tag (e.g., both are <div>).
  // Keep the DOM element, but update its properties and then check its children for updates.
  const el = oldDom as Element;
  applyProps(el, oldV.props, newV.props);

  if (newV.props.innerHTML != null) {
    if (oldV.props.innerHTML == null) {
      while (el.firstChild) {
        unmountNode(el.firstChild);
        el.removeChild(el.firstChild);
      }
    }
    (el as HTMLElement).innerHTML = String(newV.props.innerHTML);
  } else if (oldV.props.innerHTML != null) {
    while (el.firstChild) {
      unmountNode(el.firstChild);
      el.removeChild(el.firstChild);
    }
    for (const child of newV.children) {
      el.appendChild(createDom(child));
    }
  } else {
    patchChildren(el, oldV.children, newV.children);
  }

  domVNode.set(el, newV);
  return el;
}

// ── 6. List Reconciliation ──────────────────────────────────────────────────

/**
 * Figures out the best way to update a list of children elements.
 */
function patchChildren(
  parent: Element,
  oldChildren: VChild[],
  newChildren: VChild[],
): void {
  // If the list items have 'key' properties (like IDs), we can use a smarter, faster sorting algorithm.
  if (hasKeys(newChildren)) {
    patchKeyedChildren(parent, oldChildren, newChildren);
    return;
  }

  // Fallback: Dump updates directly on children matching their same spot in the list (positional).
  for (let i = 0; i < newChildren.length; i++) {
    if (i >= parent.childNodes.length) {
      // If there are more new children than old ones, add them
      parent.appendChild(createDom(newChildren[i]));
    } else {
      // Otherwise, update the existing child in this slot
      patchDOM(parent, parent.childNodes[i], oldChildren[i], newChildren[i]);
    }
  }

  // If there were more old children than new ones, remove the leftovers at the end
  while (parent.childNodes.length > newChildren.length) {
    unmountNode(parent.lastChild!);
    parent.removeChild(parent.lastChild!);
  }
}

function hasKeys(children: VChild[]): boolean {
  return children.some(
    (c) => typeof c === "object" && (c as VNode).key != null,
  );
}

/**
 * The "smart list updater".
 * Imagine a deck of cards. Instead of completely erasing and redrawing cards when they move around,
 * we give each card a unique "key". This algorithm looks at the keys to realize "Oh, this card just moved to the front",
 * so it simply moves the existing HTML element without having to destroy it and recreate it (which saves lots of time).
 */
function patchKeyedChildren(
  parent: Element,
  oldChildren: VChild[],
  newChildren: VChild[],
): void {
  // Step 1: Create a dictionary mapping the old keys to their physical HTML elements.
  const oldKeyMap = new Map<string | number, { dom: Node; vnode: VChild }>();
  for (let i = 0; i < oldChildren.length; i++) {
    const old = oldChildren[i];
    const dom = parent.childNodes[i];
    if (typeof old === "object" && old.key != null) {
      oldKeyMap.set(old.key, { dom, vnode: old });
    }
  }

  // Step 2: Loop through the new kids and place them correctly
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const key = typeof newChild === "object" ? (newChild as VNode).key : null;

    if (key != null && oldKeyMap.has(key)) {
      // We recognize this key! Update it, and move it to the right position.
      const { dom, vnode: oldVNode } = oldKeyMap.get(key)!;
      patchDOM(parent, dom, oldVNode, newChild);

      if (parent.childNodes[i] !== dom) {
        parent.insertBefore(dom, parent.childNodes[i]);
      }
      oldKeyMap.delete(key); // Check this one off our list
    } else {
      // We don't recognize this key. It must be completely new, so build it from scratch!
      parent.insertBefore(createDom(newChild), parent.childNodes[i] ?? null);
    }
  }

  // Step 3: Any leftover items in our dictionary weren't in the new list. Trash them!
  for (const { dom } of oldKeyMap.values()) {
    unmountNode(dom);
    parent.removeChild(dom);
  }
}

// ── 7. Teardown & Replacements ──────────────────────────────────────────────

/**
 * Completely replaces an old element with a new element, making sure to clean up the old one so it doesn't leave bugs.
 */
function replaceNode(parent: Node, oldDom: Node, newVNode: VChild): Node {
  unmountNode(oldDom); // Warning components they are about to be destroyed
  const newDom = createDom(newVNode);
  parent.replaceChild(newDom, oldDom);
  return newDom;
}

/**
 * The "cleanup crew". It travels down through an element and all its children,
 * letting components know they are being taken off the screen (triggering `componentWillUnmount`).
 */
function unmountNode(node: Node): void {
  const instance = domComponent.get(node as Element);
  if (instance) instance.componentWillUnmount(); // Let the component do its final goodbyes/cleanups

  for (let i = 0; i < node.childNodes.length; i++) {
    unmountNode(node.childNodes[i]);
  }
}
