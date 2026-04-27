# ⚡ MiniAct Framework

MiniAct is a lightweight, dependency-free, React-like UI framework built from scratch in vanilla TypeScript. It provides a Virtual DOM, component-based composition, reactive state management, and an efficient reconciliation engine, all within a small and understandable footprint.

## ✨ Features

- **Virtual DOM (VDOM):** Efficient in-memory representation of the UI.
- **Diffing & Reconciliation:** Fast DOM updates by patching only the differences between previous and next VDOM states.
- **Component-Based Architecture:** Reusable class-based components.
- **Reactive State Management:** Clean and predictable `setState` API.
- **Standard Props & Children:** Standardized data passing through components.
- **Lifecycle Methods:** Hooks for mounting, updating, and unmounting.
- **Event Handling:** Native event delegation using `on[Event]` props (e.g., `onClick`, `onInput`).
- **Keyed Lists:** Optimal array rendering and re-ordering using unique `key` props.

---

## 🚀 Getting Started

### 1. Bootstrapping the Application

To start a MiniAct application, you utilize the `h()` Virtual DOM factory and the `createDom()` renderer to mount your root component into the real DOM.

```typescript
import { h, createDom } from "./framework";
import { App } from "./App";

const root = document.querySelector<HTMLDivElement>("#app");
if (root) {
  root.innerHTML = "";
  // Render the MiniAct Virtual DOM into the Real DOM
  const appElement = createDom(h(App, null));
  root.appendChild(appElement);
}
```

---

## 📖 Core API

### `h(type, props, ...children)`

The `h` function is the Virtual DOM node factory (similar to `React.createElement`).

- **`type`**: An HTML tag name as a string (e.g., `"div"`, `"button"`) or a `Component` class.
- **`props`**: An object containing attributes and event listeners, or `null`.
- **`children`**: Renderable child nodes (Strings, numbers, or other VNodes).

```typescript
// Creating an HTML element
const buttonNode = h(
  "button",
  { className: "btn primary", onClick: handleClick },
  "Click Me!",
);

// Creating a Component element
const myComponentNode = h(MyComponent, { title: "Hello MiniAct" });
```

### `Component<Props, State>`

The base class for all UI components. To create a component, extend `Component`, optionally define your initial state via `initState()`, and implement the `render()` method.

```typescript
import { Component, h, VNode } from "./framework";

interface CounterProps {
  label: string;
}
interface CounterState {
  count: number;
}

export class Counter extends Component<CounterProps, CounterState> {
  // 1. Initialize State
  initState(): CounterState {
    return { count: 0 };
  }

  // 2. State Updaters
  private increment = () => {
    // Pass a patch object or an updater function
    this.setState((prev) => ({ count: prev.count + 1 }));
  };

  // 3. Render the UI
  render(): VNode {
    return h(
      "div",
      { className: "counter" },
      h("h2", null, this.props.label),
      h("p", null, `Count: ${this.state.count}`),
      h("button", { onClick: this.increment }, "Increment"),
    );
  }
}
```

---

## 🛠 Detailed Usage Guide

### State and Props

MiniAct strictly separates `props` (data passed down from the parent) and `state` (internal data managed by the component).

- Changing `this.state` via `this.setState()` automatically triggers a re-render.
- When parent components re-render, child components automatically receive updated `this.props`.

### Event Handling

Events are bound to elements simply by passing props prefixed with `on`, followed by the event name (e.g., `onClick`, `onMouseOver`, `onInput`).

```typescript
const inputNode = h("input", {
  type: "text",
  value: this.state.text,
  onInput: (e: Event) =>
    this.setState({ text: (e.target as HTMLInputElement).value }),
});
```

### Component Lifecycle hooks

MiniAct components have lifecycle hooks allowing you to run code at specific stages of a component's existence:

- **`componentDidMount()`**: Fired once after the component is initially added to the DOM. Perfect for fetching data or setting up external subscriptions.
- **`componentDidUpdate(prevProps, prevState)`**: Fired after a `setState` or when new props are received resulting in a re-render.
- **`componentWillUnmount()`**: Fired immediately before the component is destroyed and removed from the DOM. Use this to clean up timers or listeners.

### Rendering Lists & Keys

When rendering arrays of elements, use the `key` prop. This helps MiniAct's reconciler accurately identify which items have changed, been added, or been removed, minimizing DOM operations.

```typescript
render() {
  return h("ul", null,
    this.state.items.map(item =>
      h("li", { key: item.id }, item.text)
    )
  );
}
```

---

## 🏗 Framework Architecture

The MiniAct framework is deeply modularized to separate concerns securely. Below is an overview of the core engine architecture located in `src/framework`:

- **`vdom.ts`**: Contains the `h()` factory. Validates and normalizes the Virtual DOM tree.
- **`component.ts`**: Holds the exported `Component` base class implementation, state updater (`setState`), and lifecycle bindings.
- **`renderer.ts`**: The main entry point aggregating the renderer capabilities.
- **`mount.ts`**: Logic for converting `VNode` specs into actual HTML DOM Nodes and instantiating component classes.
- **`patch.ts`**: The core Diffing/Reconciliation engine. Carefully compares an old VNode tree with a new one and patches the Real DOM.
- **`props.ts`**: Reconciles and manages DOM attributes, class names, styles, and event listeners safely.
- **`unmount.ts`**: Safely tears down the UI, invoking `componentWillUnmount` and releasing DOM listener caches to prevent memory leaks.
- **`types.ts`**: Comprehensive TypeScript definitions for components, elements, states, and the framework API.
- **`internal.ts / utils.ts`**: Shared helpers and global `WeakMap` instances caching the relationship between Real DOM elements and VDOM nodes.

---

_Built with zero dependencies to demonstrate modern UI framework internals._
