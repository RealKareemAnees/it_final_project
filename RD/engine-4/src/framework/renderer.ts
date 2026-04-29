// the Renderer is responsible for taking our Virtual DOM blueprints and making them real on the screen. It also handles updates by comparing old and new blueprints and only changing what needs to be changed (this is called reconciliation or diffing). The Component class is designed to work with this Renderer, but they are decoupled so that the Component doesn't need to know about the Renderer at all. This makes our framework more flexible and easier to maintain.

import { Component } from "./component";
import type { Props, VChild, VNode, ComponentConstructor } from "./types";

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

// typeof type === "function" confirms it's callable. type.prototype instanceof Component confirms it's a subclass — not just any function. The renderer uses this to decide whether to document.createElement or new type(props).
function isComponentClass(type: unknown): type is ComponentConstructor {
  return typeof type === "function" && type.prototype instanceof Component;
}

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

  for (const key of Object.keys(oldProps)) {
    // if the new props still have this key, we don't need to remove it — we'll just update it in the next loop. Only if it's gone from the new props do we need to remove it from the DOM.
    if (key === "key" || key === "children" || key in newProps) continue;

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
    if (key === "key" || key === "children") continue;

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

// Takes a VNode (or text) and returns a real DOM node. This is a recursive function — every child is also passed through createDom.
export function createDom(vnode: VChild): Node {
  // Case 1: The blueprint is just plain text or a number: Text node handling: If the VChild is a string or number, create a DOM TextNode. The domVNode WeakMap stores what value this text node was created from, enabling diff later.
  if (typeof vnode === "string" || typeof vnode === "number") {
    const text = document.createTextNode(String(vnode));
    domVNode.set(text, vnode); // Write our sticky note
    return text;
  }

  const { type, props, children } = vnode;

  // Case 2: The blueprint is a custom Component (e.g., <MyButton />)
  if (isComponentClass(type)) {
    const Ctor = type as ComponentConstructor;
    // Create the component instance, giving it the props and children. The component can access its children via this.props.children, just like in React.
    const instance = new Ctor({ ...props, children: children });

    // Call render() to get the VNode tree, then recursively create real DOM from it. Store both the VNode snapshot and the real DOM root on the instance.
    const renderedVNode = instance.render();
    instance._renderedVNode = renderedVNode;
    const dom = createDom(renderedVNode) as Element;
    instance._root = dom;

    // _doReconcile Definition: This is the function that will be called whenever the component's state changes (via setState). It re-renders the component and updates the DOM to match the new VNode tree. By defining it here, we give the component a way to trigger updates without needing to know anything about the Renderer.
    instance._doReconcile = () => {
      // If the component isn't mounted yet, we don't have a DOM or a previous VNode to compare against, so we can't do reconciliation. This is a safety check to prevent errors if setState is called before the component is fully mounted.
      if (!instance._root || !instance._renderedVNode) return;

      // Call instance.render() to get the new VNode tree based on the updated state and props. This is what the component should look like now.
      const newVNode = instance.render(); // What it should look like now
      const parent = instance._root.parentNode as Node;

      // Call patchDOM to diff old tree vs new tree and minimally update the DOM to match the new tree. This is the heart of the reconciliation process. patchDOM will compare instance._renderedVNode (the old VNode) with newVNode (the new VNode) and make the smallest possible changes to the actual DOM to make it look like newVNode.
      const newRoot = patchDOM(
        parent,
        instance._root,
        instance._renderedVNode,
        newVNode,
      );

      // Update _root and _renderedVNode to point to the new values
      instance._root = newRoot as Element;
      instance._renderedVNode = newVNode;
    };

    domComponent.set(dom, instance);
    domVNode.set(dom, vnode);

    // After the component is mounted and the DOM is ready, we call componentDidMount. We use queueMicrotask to ensure it runs after the current JavaScript execution stack is finished, which means the component is fully mounted and the DOM is updated before componentDidMount runs. This mimics React's behavior where componentDidMount runs after the first render.
    queueMicrotask(() => instance.componentDidMount());

    // Return the DOM element that represents this component. This will be attached to the parent in the Renderer.
    return dom;
  }

  // Case 3: The blueprint is a regular HTML element (e.g., <div>, <span>)
  const el = document.createElement(type as string);
  domVNode.set(el, vnode);
  applyProps(el, {}, props); // Apply all the properties (classes, ids, styles)

  // Recursively build and add all the children inside this element
  for (const child of children) {
    el.appendChild(createDom(child));
  }

  return el;
}

//  Given the old DOM node and old VNode, and the new VNode we want to reach, update the DOM to match. Returns the (possibly new/replaced) DOM node.
export function patchDOM(
  parent: Node,
  oldDom: Node,
  oldVNode: VChild,
  newVNode: VChild,
): Node {
  // If both old and new are strings/numbers, just update textContent if it changed. Reuse the same text node. This is the cheapest possible update.
  if (
    (typeof oldVNode === "string" || typeof oldVNode === "number") &&
    (typeof newVNode === "string" || typeof newVNode === "number")
  ) {
    oldDom.textContent = String(newVNode);
    domVNode.set(oldDom, newVNode);
    return oldDom;
  }
  // If we had text and now have an element (or vice versa), there's no way to morph one into the other. We destroy the old node and create a fresh one.
  if (
    (typeof oldVNode === "string" || typeof oldVNode === "number") &&
    !(typeof newVNode === "string" || typeof newVNode === "number")
  ) {
    return replaceNode(parent, oldDom, newVNode);
  }

  // At this point, we know both oldVNode and newVNode are VNode objects (not text). We can safely cast them to VNode to access their properties.
  const oldV = oldVNode as VNode;
  const newV = newVNode as VNode;

  // Both are elements/components but different types (e.g., <div> vs <span>, or MyButton vs MyCard). We can't morph one into the other, so we have to replace the whole thing.
  if (oldV.type !== newV.type) return replaceNode(parent, oldDom, newVNode);

  // It's the exact same custom Component. Just give it the new properties (props).
  if (isComponentClass(newV.type)) {
    const instance = domComponent.get(oldDom);
    if (!instance) return replaceNode(parent, oldDom, newVNode);

    const prevProps = instance.props;
    instance.props = { ...newV.props, children: newV.children };

    // Only force it to re-draw if its new properties has actually changed. This is an optimization to avoid unnecessary re-renders. We do a simple JSON.stringify comparison here, which isn't the most efficient or robust way to compare props, but it works for simple cases
    if (JSON.stringify(prevProps) !== JSON.stringify(instance.props)) {
      instance._doReconcile?.();
    }
    return instance._root!;
  }

  // Rule 5: It's the same regular HTML tag (e.g., both are <div>).
  // Keep the DOM element, but update its properties and then check its children for updates.
  const el = oldDom as Element;
  applyProps(el, oldV.props, newV.props);
  patchChildren(el, oldV.children, newV.children);

  domVNode.set(el, newV);
  return el;
}

// Figures out the best way to update a list of children elements. If the children have keys, we can do a fast O(n) update. If they don't have keys, we have to do a slow O(n^2) update by trying to match children based on their position in the list.
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

function patchKeyedChildren(
  parent: Element,
  oldChildren: VChild[],
  newChildren: VChild[],
): void {
  //  build a map of key → { dom, vnode } for all old children. This is an O(n) setup cost that enables O(1) lookups below. We also keep track of the actual DOM node for each old child so we can move it around if needed.
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
