# MiniAct — The Complete Guide

### Architecture, Internals, and How to Use It

---

## Table of Contents

1. [What Is MiniAct and Why Does It Exist?](#1-what-is-miniact-and-why-does-it-exist)
2. [The Fundamental Problem: Raw DOM Manipulation Is Painful](#2-the-fundamental-problem-raw-dom-manipulation-is-painful)
3. [The Solution: Virtual DOM](#3-the-solution-virtual-dom)
4. [Architecture Overview — The Four Layers](#4-architecture-overview--the-four-layers)
5. [Layer 1: Types — The Shared Language (`types.ts`)](#5-layer-1-types--the-shared-language-typests)
6. [Layer 2: The Virtual DOM Factory — `h()` (`vdom.ts`)](#6-layer-2-the-virtual-dom-factory--h-vdomts)
7. [Layer 3: The Component Base Class (`component.ts`)](#7-layer-3-the-component-base-class-componentts)
8. [Layer 4: The Renderer — Where the Magic Happens (`renderer.ts`)](#8-layer-4-the-renderer--where-the-magic-happens-rendererts)
   - [createDom — First Mount](#81-createdom--first-mount)
   - [applyProps — Talking to the Real DOM](#82-applyprops--talking-to-the-real-dom)
   - [patchDOM — Diffing Old vs New](#83-patchdom--diffing-old-vs-new)
   - [patchChildren — Reconciling Lists](#84-patchchildren--reconciling-lists)
   - [Keyed Reconciliation — The Smart List Algorithm](#85-keyed-reconciliation--the-smart-list-algorithm)
9. [The Full Data Flow: One setState() Call, Step by Step](#9-the-full-data-flow-one-setstate-call-step-by-step)
10. [Key Design Decisions and Why They Were Made](#10-key-design-decisions-and-why-they-were-made)
11. [How to Use MiniAct — Complete Usage Guide](#11-how-to-use-miniact--complete-usage-guide)
    - [Writing Your First Component](#111-writing-your-first-component)
    - [Props — Data from Parent to Child](#112-props--data-from-parent-to-child)
    - [State — Private Component Data](#113-state--private-component-data)
    - [Lifecycle Methods](#114-lifecycle-methods)
    - [Event Handling](#115-event-handling)
    - [Composing Components](#116-composing-components)
    - [Rendering Lists](#117-rendering-lists)
    - [Conditional Rendering](#118-conditional-rendering)
12. [Walking Through the Example App](#12-walking-through-the-example-app)
13. [Common Mistakes and How to Avoid Them](#13-common-mistakes-and-how-to-avoid-them)

---

## 1. What Is MiniAct and Why Does It Exist?

MiniAct is a from-scratch implementation of the core ideas behind React, built entirely from vanilla TypeScript with zero runtime dependencies. It is not a toy — it compiles to a 17.8kb bundle that works in any modern browser and handles real use cases: stateful components, list rendering with keys, lifecycle hooks, parent-to-child prop passing, and event management with proper cleanup.

The purpose of building it from scratch is exactly that — to understand every layer. Most developers use React for years without knowing what a VNode is, why keys matter, or how `setState` knows to trigger a re-render. MiniAct removes all the abstractions so there is nowhere to hide: every mechanism is visible, every line has a reason.

The framework is composed of exactly four source files plus an entry point, totalling roughly 250 lines of logic. That is not a lot of code to run an entire UI system, which is the point — the ideas are simple. The implementation details are what take work.

---

## 2. The Fundamental Problem: Raw DOM Manipulation Is Painful

Before understanding why MiniAct exists, you need to feel the pain it solves. Imagine building a todo list with raw DOM APIs:

```javascript
// Every time the state changes, you have to do all of this manually:
function renderTodos(todos) {
  const ul = document.querySelector("#list");
  ul.innerHTML = ""; // nuclear option — destroy everything

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    li.classList.toggle("done", todo.done);
    li.addEventListener("click", () => toggle(todo.id)); // memory leak if not cleaned up
    ul.appendChild(li);
  });
}
```

There are at least four problems with this approach that compound as the app grows:

**Problem 1 — You describe HOW, not WHAT.** You write imperative instructions: create this element, set this attribute, append it here. You are a construction worker following blueprints step by step. Framework-based code lets you describe _what the UI should look like_ and the framework figures out the steps.

**Problem 2 — Re-rendering is brutal.** `innerHTML = ''` destroys the entire subtree and rebuilds it from nothing. Input focus is lost. Scroll positions reset. Animations are cut off. Every DOM node — even ones that didn't change — gets thrown away and recreated.

**Problem 3 — State and UI drift apart.** Your JavaScript objects (the data) and the DOM (the display) are separate systems. You have to manually keep them in sync. Miss one update, and they diverge silently.

**Problem 4 — Event listener leaks.** Every `addEventListener` call must have a matching `removeEventListener` call. In the naive approach of `innerHTML = ''`, the old listeners are orphaned in memory even though their elements are gone.

MiniAct solves all four problems at once.

---

## 3. The Solution: Virtual DOM

The central insight is this: **describing a UI is cheap; touching the real DOM is expensive.**

The Virtual DOM is a plain JavaScript object tree — a _description_ of what the UI should look like. It costs almost nothing to create these objects. Touching the real DOM (creating elements, setting attributes, inserting nodes) is comparatively slow because the browser has to do layout calculations, style computations, and potentially repaint pixels.

So the strategy becomes:

1. On every update, generate a brand new description of the entire UI (cheap).
2. Compare the new description against the old one (also cheap — it's just object comparison).
3. Apply _only the differences_ to the real DOM (minimally expensive).

This comparison process is called **diffing** or **reconciliation**. The thing being compared is the VNode tree. The act of applying the differences is called **patching**.

A VNode in MiniAct looks like this:

```typescript
{
  type: "div",
  props: { className: "counter card" },
  children: [
    { type: "h2", props: { className: "counter__label" }, children: ["Counter"] },
    { type: "div", props: { className: "counter__value" }, children: ["5"] }
  ],
  key: null
}
```

It is just a nested plain object. No methods, no class instances, no browser APIs. Creating it is as simple as creating any JavaScript object — which means it is extremely fast.

---

## 4. Architecture Overview — The Four Layers

MiniAct is organized into exactly four files that form a clean dependency chain. Understanding this chain is the most important structural thing you can know about the framework.

```
types.ts          ← shared type definitions, no logic, no imports
    ↓
vdom.ts           ← h() factory function, imports types only
    ↓
component.ts      ← Component base class, imports types only
    ↓
renderer.ts       ← createDom, patchDOM, mount — imports all three above
```

Notice that the arrows only point downward. This is intentional and critical: **no lower layer imports a higher layer.** This avoids circular dependencies.

The one tricky case is that `component.ts` needs to trigger DOM updates (patching), which lives in `renderer.ts`. But `renderer.ts` is above `component.ts`. If `component.ts` imported `renderer.ts`, you would have a circular import: A imports B, B imports A. Circular imports cause runtime errors in module systems.

The solution — explained in detail in Section 10 — is the `_doReconcile` callback pattern. The renderer injects a function into each component instance after mounting it, breaking the circular dependency.

---

## 5. Layer 1: Types — The Shared Language (`types.ts`)

`types.ts` has no logic and no runtime behavior. It is purely a vocabulary document — it defines the shapes that the rest of the framework uses to talk to each other. In TypeScript, this is enforced at compile time. In JavaScript, you can think of these as documentation contracts.

```typescript
export type Props = Record<string, any>;
```

`Props` is just a shorthand for "an object with any string keys and any values." Every component receives props, every VNode carries props. Using a type alias means you write `Props` instead of `Record<string, any>` everywhere, which makes the code more readable and the intent clearer.

```typescript
export type VChild = VNode | string | number;
```

A child in the virtual DOM tree is one of three things: another VNode (a nested element or component), a string (text content), or a number (which will be converted to a string). This is why you can write both `h("p", null, "Hello")` and `h("p", null, String(count))` — the renderer handles all three cases.

```typescript
export interface VNode {
  type: string | ComponentConstructor;
  props: Props;
  children: VChild[];
  key?: string | number | null;
}
```

This is the heart of the Virtual DOM. A VNode is a plain object with four fields:

- `type`: either a string like `"div"` or `"button"` (for HTML elements) or a class reference like `Counter` or `TodoList` (for components). The renderer uses this field to decide whether to create a DOM element or instantiate a class.
- `props`: the attributes, event handlers, and other data for this node.
- `children`: the nested child VNodes or text values.
- `key`: an optional identifier used for efficient list reconciliation (covered in depth in Section 8.5).

```typescript
export type ComponentConstructor = new (props: any) => Component<any, any>;
```

This is the TypeScript type for "a class that can be instantiated with `new`." The `any` generics are intentional — strict generics here would cause TypeScript's variance checker to reject valid component class references. This is a known limitation of TypeScript's structural type system with generics, and using `any` is the standard pragmatic solution.

---

## 6. Layer 2: The Virtual DOM Factory — `h()` (`vdom.ts`)

The `h` function (short for "hyperscript") is how you build VNode trees. It is the equivalent of `React.createElement()`. Every UI you write in MiniAct is an `h()` call or a tree of them.

```typescript
export function h(
  type: string | ComponentConstructor,
  props?: Props | null,
  ...children: (VChild | VChild[] | null | undefined | boolean)[]
): VNode;
```

The function signature accepts:

- `type`: the tag name or component class
- `props`: the attributes (or `null` if there are none)
- `...children`: any number of additional arguments, which become the children

The rest parameter `...children` collects all extra arguments into an array. This is what allows you to write:

```typescript
h("div", null, child1, child2, child3);
// or
h("div", null, arrayOfChildren);
// or even
h("div", null, someCondition && h("span", null, "Visible"));
```

The body of `h` does two important things before building the VNode:

**Step 1: Flatten arrays.** If you pass `items.map(item => h(...))` as a child, that produces a single array argument. `.flat(Infinity)` collapses nested arrays into one flat list so the renderer always receives a simple `VChild[]` regardless of how nested the input was.

**Step 2: Strip falsy values.** The filter removes `null`, `undefined`, `false`, and `true` from the children array. This is what makes conditional rendering work:

```typescript
h("div", null, isLoggedIn && h("span", null, "Welcome"));
// When isLoggedIn is false, the && expression evaluates to false
// false is filtered out → the span simply doesn't exist in the VNode
```

Boolean `true` is also filtered because patterns like `isAdmin && <AdminPanel/>` where `isAdmin` is true would otherwise produce `true` as a child node.

After filtering and flattening, `h()` returns a plain VNode object. No magic happens here — it is literally just object construction.

---

## 7. Layer 3: The Component Base Class (`component.ts`)

The `Component` class is an abstract base class. "Abstract" means you cannot instantiate it directly — you must subclass it and implement the `render()` method. This is the OOP equivalent of an interface with some built-in behavior.

### Generic Type Parameters

```typescript
abstract class Component<
  P extends Props = Props,
  S extends Props = Props
>
```

`P` is the Props type for this component, `S` is the State type. The defaults (`= Props`) mean that if you don't specify them, they default to the generic `Props` type. When you write:

```typescript
class Counter extends Component<CounterProps, CounterState>
```

TypeScript will now enforce that `this.props` has the shape of `CounterProps` and `this.state` has the shape of `CounterState`, catching mistakes at compile time.

### Internal Fields

```typescript
_root: Element | null = null;
_renderedVNode: VNode | null = null;
_doReconcile: (() => void) | null = null;
```

These three fields start with underscore by convention to signal "do not touch these from outside the framework." They are set by the renderer, not by you.

- `_root`: the actual DOM element that this component's `render()` produced. The renderer needs this to know which DOM node to patch.
- `_renderedVNode`: the last VNode tree that `render()` returned. This is the "old" snapshot that the differ compares against on the next update.
- `_doReconcile`: a function injected by the renderer that, when called, triggers a re-render and DOM patch. This is how `setState` triggers a visual update without `component.ts` needing to import `renderer.ts`.

### `initState()`

```typescript
initState(): S {
  return {} as S;
}
```

This method provides the initial state. You override it in your subclass. The reason this exists instead of just setting `this.state = ...` in the constructor is timing: `initState` is called inside the `Component` constructor after `this.props` is already assigned, so you can use `this.props` to compute the initial state:

```typescript
initState(): CounterState {
  return { count: this.props.start ?? 0 }; // uses props safely
}
```

If you tried to do this in the constructor with `this.state = { count: this.props.start }`, it would work fine in this case, but `initState` is a cleaner, more intentional pattern.

### `setState()`

```typescript
setState(updater: Partial<S> | ((prev: S) => Partial<S>)): void {
  const prevProps = this.props;
  const prevState = { ...this.state };
  const patch = typeof updater === "function" ? updater(this.state) : updater;
  this.state = { ...this.state, ...patch };
  this._doReconcile?.();
  this.componentDidUpdate(prevProps, prevState);
}
```

This is the core state management mechanism. It accepts two forms:

**Object form:** `this.setState({ count: 5 })` — merges the provided partial state into the existing state using the spread operator. Only the keys you provide are changed; others are preserved.

**Functional form:** `this.setState(prev => ({ count: prev.count + 1 }))` — passes the _current_ state to a function and merges the return value. This form is safer when the new state depends on the old state, because it guarantees you're reading the latest value. If you call `setState` multiple times synchronously, the object form might read a stale snapshot. The functional form always reads the current committed state.

After updating `this.state`, `setState` calls `this._doReconcile?.()`. The `?.` is the optional chaining operator — it only calls `_doReconcile` if it's not null. If the component hasn't been mounted yet (which would be unusual but possible), this is a safe no-op.

Finally, `componentDidUpdate` is called with the snapshots taken _before_ the state was changed, so the lifecycle method has access to both old and new values.

### Lifecycle Methods

The three lifecycle methods are empty by default:

```typescript
componentDidMount(): void {}
componentDidUpdate(_prevProps: P, _prevState: S): void {}
componentWillUnmount(): void {}
```

Making them empty rather than abstract means subclasses don't have to implement them. You only override the ones you need. The leading underscore on the parameters is a TypeScript convention meaning "I know about this parameter but I'm intentionally not using it in the base implementation."

---

## 8. Layer 4: The Renderer — Where the Magic Happens (`renderer.ts`)

The renderer is the most complex and important file. It is responsible for everything that touches the real DOM: creating nodes, updating attributes, diffing trees, and cleaning up. It is the bridge between the world of VNodes (plain objects) and the world of the browser.

### The Three WeakMaps

At the top of the renderer, three `WeakMap` instances are declared:

```typescript
const domVNode = new WeakMap<Node, VChild>();
const domComponent = new WeakMap<Node, Component>();
const domListeners = new WeakMap<Element, Record<string, EventListener>>();
```

A `WeakMap` is like a regular `Map` except its keys must be objects, and the keys are held "weakly" — meaning if the key object (the DOM node) is garbage-collected because nothing else references it, the WeakMap entry is automatically removed. This is critical for memory safety: when a DOM node is removed from the page, any metadata associated with it is automatically cleaned up.

These three maps serve as a hidden metadata layer attached to DOM nodes without modifying the DOM nodes themselves:

- **`domVNode`**: maps each DOM node to the VNode it was built from. When `patchDOM` is called, it reads this map to get the "old" VNode for comparison. This is how the differ knows what the node currently looks like.
- **`domComponent`**: maps a DOM node to the component instance that _owns_ it (if any). When the parent re-renders and produces a new VNode for `<Counter />`, the renderer looks up this map to find the existing `Counter` instance and update its props rather than creating a new one.
- **`domListeners`**: maps each element to a dictionary of its current event listeners. This allows `applyProps` to properly remove old listeners before adding new ones, preventing the event listener leak problem described in Section 2.

### 8.1 `createDom` — First Mount

`createDom` is called exactly once per node — on first mount. It recursively converts a VNode tree into a real DOM tree. It handles three cases:

**Case 1: Text or number leaf**

```typescript
if (typeof vnode === "string" || typeof vnode === "number") {
  const text = document.createTextNode(String(vnode));
  domVNode.set(text, vnode);
  return text;
}
```

A primitive value becomes a DOM `TextNode`. The node is registered in `domVNode` so future patches can find what it was built from.

**Case 2: Component node** — when `type` is a class

```typescript
if (isComponentClass(type)) {
  const instance = new Ctor({ ...props, children });

  const renderedVNode = instance.render();
  instance._renderedVNode = renderedVNode;

  const dom = createDom(renderedVNode) as Element;
  instance._root = dom;

  instance._doReconcile = () => { ... };

  domComponent.set(dom, instance);
  queueMicrotask(() => instance.componentDidMount());
  return dom;
}
```

When `isComponentClass` returns true, the renderer:

1. Instantiates the component class with its props merged with children
2. Calls `render()` to get the VNode tree the component describes
3. Recursively calls `createDom` on that VNode — this is the recursion that handles nested components
4. Stores the rendered VNode on the instance (`_renderedVNode`) for future diffing
5. Stores the root DOM node on the instance (`_root`) so patches know where to write
6. **Injects `_doReconcile`** — a closure that captures the instance and knows how to re-render it
7. Registers the instance in `domComponent` so future patches can find it
8. Schedules `componentDidMount` via `queueMicrotask`

The `isComponentClass` helper is:

```typescript
function isComponentClass(type: unknown): type is ComponentConstructor {
  return typeof type === "function" && type.prototype instanceof Component;
}
```

It checks whether the value is a function (all classes are functions in JavaScript) whose prototype chain includes `Component`. This is what distinguishes `"div"` (a string, skip) from `Counter` (a class constructor, instantiate).

**Case 3: Regular HTML element**

```typescript
const el = document.createElement(type as string);
domVNode.set(el, vnode);
applyProps(el, {}, props);
for (const child of children) el.appendChild(createDom(child));
return el;
```

For string types, `createElement` produces the DOM element, `applyProps` sets its attributes and events, and the loop recursively creates all children and appends them. The empty object `{}` passed as `oldProps` tells `applyProps` there is nothing to remove — this is a fresh element.

### 8.2 `applyProps` — Talking to the Real DOM

`applyProps` translates VNode props into actual DOM operations. It is called both on first mount (with `{}` as `oldProps`) and during patches (with the previous props as `oldProps`). Its job is to apply the _difference_ between old and new props.

**Removing disappeared props:**

```typescript
for (const key of Object.keys(oldProps)) {
  if (key === "key" || key === "children") continue;
  if (key in newProps) continue; // still present, will be handled below
  // ... remove it
}
```

The renderer iterates old props and removes anything not present in the new props. `"key"` and `"children"` are framework internals and are never written to the DOM. Props that still exist in new props are skipped — they'll be updated in the next loop.

**Setting new props — the five cases:**

```typescript
if (key.startsWith("on") && typeof value === "function") {
  // Event handler: onClick → "click", onKeydown → "keydown"
  const event = key.slice(2).toLowerCase();
  if (listeners[event] !== value) {
    if (listeners[event]) el.removeEventListener(event, listeners[event]);
    el.addEventListener(event, value);
    listeners[event] = value;
  }
}
```

Event props (those starting with "on") get converted to lowercase event names and registered via `addEventListener`. The reference equality check `listeners[event] !== value` ensures that if the same function is passed on re-render, the listener is not re-registered unnecessarily. The old listener is removed first if it exists and is different. The current listener is stored in `domListeners` for future cleanup.

```typescript
else if (key === "className") {
  el.setAttribute("class", value);
}
```

JSX and MiniAct use `className` instead of `class` because `class` is a reserved word in JavaScript. The DOM attribute is still `class`, so `applyProps` translates.

```typescript
else if (key === "style" && typeof value === "object") {
  Object.assign((el as HTMLElement).style, value);
}
```

For style, you can pass a JavaScript object like `{ color: "red", fontSize: "16px" }`. `Object.assign` copies those properties onto the element's `style` object directly.

```typescript
else if (typeof value === "boolean") {
  value ? el.setAttribute(key, "") : el.removeAttribute(key);
}
```

Boolean attributes like `disabled` and `checked` are handled specially. In HTML, `<button disabled>` has the attribute present but with no value. Setting `disabled=""` achieves the same thing. Removing the attribute removes the behavior.

### 8.3 `patchDOM` — Diffing Old vs New

`patchDOM` is the differ. It is called during every re-render and recursively walks the old and new VNode trees to figure out the minimal set of DOM changes.

```typescript
export function patchDOM(
  parent: Node,
  oldDom: Node,
  oldVNode: VChild,
  newVNode: VChild,
): Node;
```

It receives the parent node (needed if replacement is necessary), the current DOM node, the VNode that produced that DOM node, and the new VNode describing what it should become. It returns the DOM node — either the same one (if it was patched in place) or a new one (if replacement was necessary).

The function works by eliminating possibilities in order:

**Rule 1: Both text/number — update in place**

```typescript
if (oldIsText && newIsText) {
  if (String(oldVNode) !== String(newVNode))
    oldDom.textContent = String(newVNode);
  return oldDom;
}
```

If both old and new are primitive values, just update the text content if it changed. The DOM node is reused. This is the cheapest possible update.

**Rule 2: One is text, one is an element — replace**

```typescript
if (oldIsText !== newIsText) return replaceNode(parent, oldDom, newVNode);
```

You cannot turn a `TextNode` into an `Element` in place. The renderer throws away the old node and creates a new one from scratch.

**Rule 3: Different `type` values — replace**

```typescript
if (oldV.type !== newV.type) return replaceNode(parent, oldDom, newVNode);
```

If a `div` becomes a `span`, or a `Counter` becomes a `TodoList`, replacement is the only option. This is important to understand: **changing a component's type is expensive**, because it destroys the entire subtree.

**Rule 4: Same Component class — update props, let it reconcile**

```typescript
if (isComponentClass(newV.type)) {
  const instance = domComponent.get(oldDom);
  instance.props = { ...newV.props, children: newV.children };
  if (JSON.stringify(prevProps) !== JSON.stringify(instance.props)) {
    instance._doReconcile?.();
  }
  return instance._root!;
}
```

When the same component class appears in both trees, the renderer does not create a new instance. Instead, it finds the existing instance via `domComponent`, updates its props, and calls `_doReconcile()` only if the props actually changed (compared via JSON stringify). This is what preserves component state across parent re-renders: the Counter's `count` in `this.state` survives because the Counter instance itself survives.

**Rule 5: Same HTML tag — patch in place**

```typescript
const el = oldDom as Element;
applyProps(el, oldV.props, newV.props);
patchChildren(el, oldV.children, newV.children);
return el;
```

For the same HTML tag, the DOM element is reused. `applyProps` applies the diff between old and new props, then `patchChildren` recurses into the children. This is where the savings come from: most of the time, re-renders change only a handful of attributes among hundreds of nodes. Only those specific attribute changes touch the DOM.

### 8.4 `patchChildren` — Reconciling Lists

`patchChildren` is called when a parent element stays the same but its children might have changed.

```typescript
function patchChildren(parent: Element, oldChildren: VChild[], newChildren: VChild[]): void {
  if (hasKeys(newChildren)) {
    patchKeyedChildren(parent, oldChildren, newChildren);
    return;
  }

  for (let i = 0; i < newChildren.length; i++) {
    if (i >= parent.childNodes.length) {
      parent.appendChild(createDom(newChildren[i]));
    } else {
      patchDOM(parent, parent.childNodes[i], oldChildren[i] ?? ..., newChildren[i]);
    }
  }

  while (parent.childNodes.length > newChildren.length) {
    unmountNode(parent.lastChild!);
    parent.removeChild(parent.lastChild!);
  }
}
```

The non-keyed algorithm is positional: child at index 0 in the old list corresponds to child at index 0 in the new list. If the new list has more children, the extras are created and appended. If the new list has fewer children, the extras at the end are removed. Removal always calls `unmountNode` first to fire `componentWillUnmount` on any components in the subtree.

The weakness of positional reconciliation shows up with lists. If you have five items and remove the first, the positional algorithm will try to patch item 1 into item 2's shape, item 2 into item 3's shape, and so on — essentially rewriting four nodes instead of removing one. This is why keys exist.

### 8.5 Keyed Reconciliation — The Smart List Algorithm

When any child VNode has a `key` prop, `patchChildren` hands off to `patchKeyedChildren`. Keys let the renderer match nodes by identity rather than position.

```typescript
function patchKeyedChildren(parent, oldChildren, newChildren): void {
  // Step 1: Build a map of key → { dom, vnode } from current children
  const oldKeyMap = new Map<string | number, { dom: Node; vnode: VChild }>();
  for (let i = 0; i < oldChildren.length; i++) {
    const old = oldChildren[i];
    const dom = parent.childNodes[i];
    if (typeof old === "object" && old.key != null)
      oldKeyMap.set(old.key, { dom, vnode: old });
  }

  // Step 2: For each new child, find or create its DOM node
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const key = typeof newChild === "object" ? newChild.key : null;

    if (key != null && oldKeyMap.has(key)) {
      // Known key: patch it and move to the correct position
      const { dom, vnode: oldVNode } = oldKeyMap.get(key)!;
      const patchedDom = patchDOM(parent, dom, oldVNode, newChild);
      const current = parent.childNodes[i];
      if (current !== patchedDom)
        parent.insertBefore(patchedDom, current ?? null);
      oldKeyMap.delete(key);
    } else {
      // New key: create from scratch and insert
      parent.insertBefore(createDom(newChild), parent.childNodes[i] ?? null);
    }
  }

  // Step 3: Remove old keyed children that didn't appear in the new list
  for (const { dom } of oldKeyMap.values()) {
    unmountNode(dom);
    parent.removeChild(dom);
  }
}
```

Walk through this algorithm with a concrete example. Say you have a list `[A, B, C, D]` and you remove item B and add item E at the end, resulting in `[A, C, D, E]`.

**Step 1** builds a map: `{ "a" → domA, "b" → domB, "c" → domC, "d" → domD }`.

**Step 2** iterates the new list `[A, C, D, E]`:

- Index 0: key "a" → found in map, patch domA in place. domA is already at index 0, no move needed. Remove "a" from map.
- Index 1: key "c" → found in map, patch domC. domC is currently at index 2, insert it before childNodes[1]. Remove "c" from map.
- Index 2: key "d" → found in map, patch domD. Now at index 2 after the move. Remove "d" from map.
- Index 3: key "e" → not in map, create new domE and append.

**Step 3**: map still contains `"b" → domB`. unmount and remove it.

Result: domA, domC, domD, domE. The entire operation touched only the minimum necessary nodes: B was removed, C and D were moved and patched, E was created. A was patched in place (its props might have changed).

Without keys, removing B would cause a cascade of four patches: index 0 patches A→A (no change, fine), index 1 patches B→C (rewriting), index 2 patches C→D (rewriting), index 3 patches D→E (rewriting), index 4 removes the last one. That's unnecessary work, and for components it's worse: those rewrites destroy and recreate component instances, losing their local state.

---

## 9. The Full Data Flow: One `setState()` Call, Step by Step

Let's trace a single user interaction — clicking the `+` button in `Counter` — all the way through the framework:

**1. User clicks the `+` button.**

The browser fires a `click` event on the button element.

**2. The event handler runs:**

```typescript
private increment = () => {
  this.setState((prev) => ({ count: prev.count + 1 }));
};
```

This method is on the Counter instance.

**3. `setState` executes in `component.ts`:**

- Saves `prevProps` and `prevState` (snapshots before the change)
- Calls the updater function with `this.state` → gets `{ count: 6 }` (if count was 5)
- Merges: `this.state = { ...this.state, count: 6 }`
- Calls `this._doReconcile?.()`

**4. `_doReconcile` runs (injected by renderer):**

```typescript
instance._doReconcile = () => {
  const newVNode = instance.render(); // step 4a
  const parent = instance._root.parentNode; // step 4b
  const newRoot = patchDOM(
    parent,
    instance._root, // step 4c
    instance._renderedVNode,
    newVNode,
  );
  instance._root = newRoot; // step 4d
  instance._renderedVNode = newVNode; // step 4e
};
```

**4a. `instance.render()` is called.**

This calls `Counter.render()` with the _new_ state (`count = 6`). It returns a fresh VNode tree describing the counter with value "6".

**4b. Get the parent DOM node.**

`instance._root.parentNode` is the `div.counter-demo` element that contains this counter.

**4c. `patchDOM` compares the old and new VNode trees.**

- Both old and new VNode have `type: "div"`, `className: "counter card"` → same type, patch in place.
- `applyProps(el, oldProps, newProps)` — `className` hasn't changed, no DOM writes.
- `patchChildren` compares the three children: `h2`, `div.counter__value`, `div.counter__controls`.
  - `h2` → same, no change.
  - `div.counter__value` → same element, but its child text changed from "5" to "6".
    - `patchDOM` recurses into its children, finds `oldVNode = "5"`, `newVNode = "6"`.
    - Both are text. "5" !== "6" → `oldDom.textContent = "6"`. **One DOM write.**
  - `div.counter__controls` → same element, three buttons. Each button's `onClick` reference is the same arrow function (defined as a class field, so it's always the same reference) → no event listener changes.

**4d & 4e.** The instance's `_root` and `_renderedVNode` are updated to the new values.

**5. Back in `setState`, `componentDidUpdate` is called:**

```typescript
componentDidUpdate(_prevProps: CounterProps, prevState: CounterState): void {
  console.log(`Count changed: ${prevState.count} → ${this.state.count}`);
}
```

This fires after the DOM is already updated.

**Total DOM operations: one** — `textContent = "6"`. The entire re-render produced exactly one write to the real DOM.

---

## 10. Key Design Decisions and Why They Were Made

### Decision 1: The `_doReconcile` Callback Injection Pattern

The most architecturally interesting decision is how `component.ts` triggers DOM updates without importing `renderer.ts`. The naive solution — `component.ts` imports from `renderer.ts` — creates a circular dependency: `renderer.ts` imports `Component` from `component.ts`, and `component.ts` would import `patchDOM` from `renderer.ts`. Circular imports cause module loading failures.

The solution is **dependency inversion**: instead of the component reaching up to grab the function it needs, the renderer pushes the function down to the component. After mounting:

```typescript
instance._doReconcile = () => {
  // This closure captures `instance` and `patchDOM` from the renderer's scope
  const newVNode = instance.render();
  const newRoot = patchDOM(
    parent,
    instance._root,
    instance._renderedVNode,
    newVNode,
  );
  instance._root = newRoot;
  instance._renderedVNode = newVNode;
};
```

The component stores a function. When it calls `this._doReconcile?.()`, it doesn't know or care what that function does internally. The renderer provided it, the renderer knows what it does. The component is just pulling a trigger.

### Decision 2: WeakMaps Instead of Custom Properties

An alternative approach would be storing metadata directly on DOM nodes:

```typescript
domNode.__vnode = vnode; // BAD
domNode.__component = instance; // BAD
```

This works, but it:

- Pollutes the global DOM node interface (every `Element` suddenly has unusual properties)
- Can conflict with other libraries or browser internals
- Makes it hard to reason about what belongs to the framework vs the page
- Does not automatically clean up when nodes are removed

`WeakMap` stores the same data in a side table completely invisible to the DOM. And because WeakMap keys are held weakly, when the DOM node is garbage-collected (because it was removed from the page and nothing else holds a reference to it), the WeakMap entry disappears automatically. No memory leaks.

### Decision 3: `queueMicrotask` for `componentDidMount`

```typescript
queueMicrotask(() => instance.componentDidMount());
```

Why not call `componentDidMount()` synchronously right after mounting?

Because `createDom` is often called in the middle of building a larger tree. When `createDom` is processing a `Counter` component, the counter's DOM node exists but may not yet be in the document — the parent element hasn't finished building, so nothing has been appended to `document.body` yet.

`queueMicrotask` schedules the callback to run after the current synchronous JavaScript call stack completes. By then, `mount()` has finished and everything is in the document. This matches the behavior a component author expects: "this runs after I'm on the page."

Microtasks run before the browser paints, which means `componentDidMount` still fires before the user sees anything — giving you a window to set up things like focus or scroll position without a visible flash.

### Decision 4: JSON.stringify for Prop Comparison

```typescript
if (JSON.stringify(prevProps) !== JSON.stringify(instance.props)) {
  instance._doReconcile?.();
}
```

When a parent re-renders and encounters a child component, it needs to decide whether the child's props changed enough to warrant a re-render. The comparison uses `JSON.stringify` on both prop objects.

This is a pragmatic trade-off. A deep-equality function would be more correct but more code. Reference equality (`prevProps !== newProps`) would always be true since `h()` creates new objects on every call. `JSON.stringify` handles nested objects and arrays, which are common in props, at the cost of slightly more CPU for complex prop trees. For a college project, this is the right call.

### Decision 5: Positional Reconciliation as the Default, Keyed as Opt-In

Not every list needs keyed reconciliation. A list of static labels, a breadcrumb trail, a fixed set of tabs — these don't reorder or splice. Checking for keys on every child reconciliation would add overhead for no benefit.

MiniAct checks `hasKeys(newChildren)` first and only enters the more complex keyed algorithm if at least one child has a `key` prop. The author of each component chooses which algorithm applies simply by whether they pass `key` props.

---

## 11. How to Use MiniAct — Complete Usage Guide

### 11.1 Writing Your First Component

Every component is a TypeScript class that:

1. Extends `Component<Props, State>` (state is optional)
2. Implements a `render()` method that returns an `h()` call

```typescript
import { Component, h } from "../framework";

class Greeting extends Component {
  render() {
    return h("h1", { className: "greeting" }, "Hello, MiniAct!");
  }
}
```

To put it on the page:

```typescript
import { h, mount } from "./framework";
import { Greeting } from "./Greeting";

mount(h(Greeting, {}), document.getElementById("app")!);
```

### 11.2 Props — Data from Parent to Child

Props are how a parent passes data down to a child. Define an interface for them, pass the type to `Component`, and access them via `this.props`.

```typescript
interface WelcomeProps {
  name: string;
  role?: string; // optional — has a default
}

class Welcome extends Component<WelcomeProps> {
  render() {
    const { name, role = "user" } = this.props;

    return h(
      "div",
      { className: "welcome" },
      h("h2", null, `Hello, ${name}!`),
      h("p", null, `You are logged in as: ${role}`),
    );
  }
}

// Usage from a parent:
h(Welcome, { name: "Alice", role: "admin" });
h(Welcome, { name: "Bob" }); // role defaults to "user"
```

**Important:** Props are read-only. Never mutate `this.props` directly. If you need to change what a child displays based on user interaction, either lift the state to the parent (so the parent re-renders with new props) or use the child's own state.

### 11.3 State — Private Component Data

State is data that belongs to a single component and can change over time. Define it with `initState()` and update it exclusively through `setState()`.

```typescript
interface ToggleState {
  isOpen: boolean;
  clickCount: number;
}

class Toggle extends Component<{}, ToggleState> {
  initState(): ToggleState {
    return { isOpen: false, clickCount: 0 };
  }

  private toggle = () => {
    // Object form — fine when new state doesn't depend on old state
    this.setState({ isOpen: !this.state.isOpen });
  };

  private increment = () => {
    // Functional form — use this when new value depends on old value
    this.setState((prev) => ({ clickCount: prev.clickCount + 1 }));
  };

  render() {
    const { isOpen, clickCount } = this.state;

    return h(
      "div",
      null,
      h("button", { onClick: this.toggle }, isOpen ? "Close" : "Open"),
      h("span", null, ` Clicked ${clickCount} times`),
      isOpen && h("div", { className: "panel" }, "Panel content here"),
    );
  }
}
```

**The golden rule:** Never write `this.state.count = 5`. Mutating state directly does not trigger a re-render — `setState` does, because `setState` calls `_doReconcile`. Direct mutation is invisible to the framework.

### 11.4 Lifecycle Methods

There are three lifecycle hooks. Override any combination you need.

```typescript
class DataFetcher extends Component<
  { url: string },
  { data: any; loading: boolean }
> {
  private timer: number | null = null;

  initState() {
    return { data: null, loading: true };
  }

  /**
   * componentDidMount — called once, after the DOM node is on the page.
   *
   * Best uses:
   *   - Fetch data from an API
   *   - Set up a timer or interval
   *   - Add global event listeners (window, document)
   *   - Initialize third-party libraries that need a DOM node
   */
  componentDidMount(): void {
    fetch(this.props.url)
      .then((r) => r.json())
      .then((data) => this.setState({ data, loading: false }));

    this.timer = setInterval(() => this.refreshData(), 30_000);
  }

  /**
   * componentDidUpdate — called after every setState re-render.
   *
   * Best uses:
   *   - React to specific state/prop changes (check prev vs current)
   *   - Trigger follow-up fetches when a prop changes
   *   - Scroll to a position after new content appears
   *
   * Warning: Calling setState inside componentDidUpdate creates an
   * infinite loop unless you guard it with a condition.
   */
  componentDidUpdate(prevProps: { url: string }, _prevState: any): void {
    if (prevProps.url !== this.props.url) {
      this.setState({ loading: true, data: null });
      fetch(this.props.url)
        .then((r) => r.json())
        .then((data) => this.setState({ data, loading: false }));
    }
  }

  /**
   * componentWillUnmount — called right before the component is removed.
   *
   * Best uses:
   *   - Clear timers/intervals (critical — they run forever if not cleared)
   *   - Remove global event listeners you added in componentDidMount
   *   - Cancel in-flight network requests
   */
  componentWillUnmount(): void {
    if (this.timer !== null) clearInterval(this.timer);
  }

  render() {
    return this.state.loading
      ? h("p", null, "Loading…")
      : h("pre", null, JSON.stringify(this.state.data, null, 2));
  }
}
```

The lifecycle sequence for a component's entire life is:

```
constructor(props)
  → initState()
  → render()           [first render, DOM is built]
  → componentDidMount()

[user interaction or parent re-render]
  → setState() or props update
  → render()           [subsequent renders]
  → componentDidUpdate(prevProps, prevState)

[component removed from parent's render output]
  → componentWillUnmount()
  [DOM node removed]
```

### 11.5 Event Handling

Event props follow a camelCase naming convention: `onClick`, `onChange`, `onInput`, `onKeydown`, `onMouseover`, etc. The renderer strips the "on" prefix and lowercases the rest to get the actual DOM event name.

```typescript
class Form extends Component<{}, { value: string; submitted: boolean }> {
  initState() {
    return { value: "", submitted: false };
  }

  // Arrow function class fields automatically bind `this`
  // This is the recommended pattern in MiniAct
  private handleInput = (e: Event) => {
    this.setState({ value: (e.target as HTMLInputElement).value });
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") this.submit();
  };

  private submit = () => {
    if (!this.state.value.trim()) return;
    this.setState({ submitted: true });
  };

  render() {
    const { value, submitted } = this.state;

    if (submitted) return h("p", null, `Submitted: "${value}"`);

    return h(
      "div",
      null,
      h("input", {
        type: "text",
        value: value,
        onInput: this.handleInput,
        onKeydown: this.handleKeyDown,
        placeholder: "Type and press Enter…",
      }),
      h("button", { onClick: this.submit }, "Submit"),
    );
  }
}
```

**Why arrow function class fields?** Regular methods lose their `this` binding when passed as callbacks:

```typescript
// This breaks — `this` is undefined when the event fires
private handleClick() {
  this.setState({ ... }); // TypeError
}
h("button", { onClick: this.handleClick }, "Click me")

// This works — arrow functions capture `this` lexically
private handleClick = () => {
  this.setState({ ... }); // `this` is always the component instance
}
```

Arrow function class fields are initialized in the constructor and bound to the instance, so they always have the right `this` regardless of how they're called.

### 11.6 Composing Components

Components can render other components. Pass them as the `type` to `h()`:

```typescript
class UserCard extends Component<{ user: User }> {
  render() {
    const { user } = this.props;
    return h(
      "div",
      { className: "user-card" },
      h(Avatar, { src: user.avatarUrl, alt: user.name }),
      h(
        "div",
        { className: "user-card__info" },
        h("h3", null, user.name),
        h("p", null, user.email),
        h(FollowButton, { userId: user.id, isFollowing: user.isFollowing }),
      ),
    );
  }
}
```

Each composed component is an independent unit with its own state. `Avatar`, `FollowButton`, and `UserCard` can each call `setState` without affecting each other.

**Passing callbacks from parent to child** allows children to communicate upward:

```typescript
class Parent extends Component<{}, { count: number }> {
  initState() {
    return { count: 0 };
  }

  // Defined on the parent, but called by the child
  private handleChildAction = (amount: number) => {
    this.setState((prev) => ({ count: prev.count + amount }));
  };

  render() {
    return h(
      "div",
      null,
      h("p", null, `Parent count: ${this.state.count}`),
      // The child receives this as a prop and calls it when appropriate
      h(ChildButton, { onAction: this.handleChildAction }),
    );
  }
}

interface ChildButtonProps {
  onAction: (amount: number) => void;
}

class ChildButton extends Component<ChildButtonProps> {
  render() {
    return h(
      "button",
      {
        onClick: () => this.props.onAction(5),
      },
      "Add 5 to parent",
    );
  }
}
```

### 11.7 Rendering Lists

To render a list, use `.map()` inside `h()` to produce an array of VNodes. Always provide a `key` prop that uniquely identifies each item:

```typescript
class ShoppingList extends Component<{}, { items: Item[] }> {
  render() {
    return h(
      "ul",
      null,
      // Spread the array — h() flattens it automatically
      ...this.state.items.map((item) =>
        h(
          "li",
          { key: item.id }, // ← key is critical
          h("span", null, item.name),
          h(
            "button",
            {
              onClick: () => this.removeItem(item.id),
            },
            "Remove",
          ),
        ),
      ),
    );
  }
}
```

**When to use spread (`...`) vs direct:**

```typescript
// These are equivalent — h() flattens arrays automatically:
h("ul", null, ...items.map(...))          // spread into separate args
h("ul", null, items.map(...))             // array as single arg, gets flattened

// Both produce: h("ul", null, child1, child2, child3...)
```

**Key rules for `key`:**

- Keys must be unique among siblings (not globally)
- Use a stable, unique identifier like a database ID — not the array index
- Array indexes are dangerous as keys: if you remove item 0, every subsequent item's index changes, making the key useless for identity tracking
- Keys can be strings or numbers

### 11.8 Conditional Rendering

Three patterns, each with appropriate use cases:

**Pattern 1: Logical AND (`&&`)** — show something or show nothing

```typescript
render() {
  return h("div", null,
    this.state.isLoading && h(Spinner, {}),
    !this.state.isLoading && h(Content, { data: this.state.data })
  );
}
```

**Pattern 2: Ternary operator (`? :`)** — show one thing or another

```typescript
render() {
  return h("div", null,
    this.state.error
      ? h(ErrorMessage, { message: this.state.error })
      : h(SuccessContent, { data: this.state.data })
  );
}
```

**Pattern 3: Early return** — completely different UI based on state

```typescript
render() {
  if (this.state.isLoading) {
    return h("div", { className: "spinner-container" }, h(Spinner, {}));
  }

  if (this.state.error) {
    return h("div", { className: "error" }, this.state.error);
  }

  return h("div", { className: "content" }, this.state.data);
}
```

The early return pattern is cleanest when the component has fundamentally different layouts for different states. Note that when a component switches between layouts via early return, if the root element type changes (e.g., `"div"` → `"div"` with different className), it patches; if the type changes (e.g., `"div"` → `"section"`), the DOM node is replaced.

---

## 12. Walking Through the Example App

The example app (`App.ts`, `Counter.ts`, `TodoList.ts`) demonstrates every concept in combination. Here's what each file teaches:

**`main.ts`** — The entry point is two lines: find the container element and call `mount`. `mount` calls `createDom` on the App VNode, which bootstraps the entire tree.

**`App.ts`** — The root component. Its state is just `activeTab`. When a tab button is clicked, `setState({ activeTab: "todo" })` triggers a re-render. The `render()` uses a ternary to show either the counter demo or the todo list. When switching tabs, the disappearing component's `componentWillUnmount` fires; the appearing component's `componentDidMount` fires.

**`Counter.ts`** — Demonstrates the most fundamental pattern: state + events. Notice that `increment`, `decrement`, and `reset` are all arrow function class fields. The `initState` method reads from `this.props.start`, showing that initial state can depend on props. The `componentDidUpdate` lifecycle logs the change, showing how to observe state transitions.

**`TodoList.ts`** — The most complex component. Key observations:

- `TodoItem` is a private sub-component defined in the same file. It has no state of its own — it is purely display, receiving `todo`, `onToggle`, and `onDelete` as props. Callbacks travel downward (parent to child), trigger upward (child to parent).
- The `visible` array is derived from state during render — not stored in state. The filter just changes how you view the `todos` array. Derived data should never be stored in state; it should be computed from state during render.
- `nextId` in state is an ever-increasing counter, not recycled. This is important: if you deleted todo 3 and created a new one, giving the new one id 3 would confuse the keyed algorithm (it would think the new todo is the old deleted one).
- The filter buttons have `key` props even though they don't reorder. This is defensive programming — it doesn't hurt, and it makes the intent explicit.

---

## 13. Common Mistakes and How to Avoid Them

### Mistake 1: Mutating state directly

```typescript
// ❌ Does nothing — no re-render triggered
this.state.todos.push(newTodo);

// ✅ Correct — creates a new array, triggers re-render
this.setState((prev) => ({ todos: [...prev.todos, newTodo] }));
```

The renderer only knows to update when `setState` is called. Mutating `this.state` directly changes the data but nothing tells the renderer. Also, mutating the old state means `prevState` in `componentDidUpdate` will show the "wrong" values since it's the same object reference.

### Mistake 2: Using the object form when you need the functional form

```typescript
// ❌ Potentially stale — reads this.state which might lag in rapid updates
this.setState({ count: this.state.count + 1 });

// ✅ Safe — always reads the latest committed state
this.setState((prev) => ({ count: prev.count + 1 }));
```

In MiniAct's synchronous model this is less likely to cause bugs than in React's asynchronous model, but it's a good habit that will serve you in any framework.

### Mistake 3: Forgetting `key` on list items

```typescript
// ❌ Positional reconciliation — slow, loses component state on reorder/insert
items.map((item) => h(TodoItem, { todo: item }));

// ✅ Keyed — fast, stable identity
items.map((item) => h(TodoItem, { key: item.id, todo: item }));
```

### Mistake 4: Using array index as `key`

```typescript
// ❌ Index-based keys invalidate on every insert/delete
items.map((item, index) => h(Item, { key: index, ... }))

// ✅ Stable unique IDs
items.map(item => h(Item, { key: item.id, ... }))
```

### Mistake 5: Calling `setState` inside `render()`

```typescript
// ❌ Infinite loop — setState triggers render, render calls setState...
render() {
  this.setState({ something: true }); // 🔥
  return h("div", null, "...");
}
```

`render()` must be a pure function of `this.props` and `this.state`. It reads them, it does not change them.

### Mistake 6: Forgetting to clean up in `componentWillUnmount`

```typescript
// ❌ The interval runs forever even after the component is removed
componentDidMount() {
  setInterval(() => this.tick(), 1000);
}

// ✅ Save the ID and clear it
private timerId: number = -1;

componentDidMount() {
  this.timerId = setInterval(() => this.tick(), 1000);
}

componentWillUnmount() {
  clearInterval(this.timerId);
}
```

### Mistake 7: Storing derived data in state

```typescript
// ❌ Redundant — now you have to keep todos and filteredTodos in sync
initState() {
  return { todos: [...], filter: "all", filteredTodos: [...] };
}

// ✅ Compute during render — always in sync, no extra state
render() {
  const filtered = this.state.todos.filter(t =>
    this.state.filter === "all" || t.done === (this.state.filter === "done")
  );
  // use filtered here
}
```

---

_MiniAct is roughly 250 lines of framework code. React is hundreds of thousands. The gap is filled by production concerns: concurrent rendering, error boundaries, context, hooks, server rendering, DevTools integration, and years of edge-case fixes. But the core ideas — Virtual DOM, reconciliation, component lifecycle, state management — are all here, working, and completely transparent to you._
