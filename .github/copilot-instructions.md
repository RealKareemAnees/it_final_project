# Project

this project is car wiki website

# ENGINE Framework

ENGINE is a React-like UI framework written in vanilla TypeScript. It uses a Virtual DOM, class-based components, and a reconciliation engine. There are no JSX transforms — UI is built with the `h()` function.

---

## Core Imports

```ts
import { h, Component, createDom } from "./framework";
import type { VNode } from "./framework";
```

---

## Creating a Component

Extend `Component<Props, State>`. Always implement `render()`. Use `initState()` for initial state.

```ts
interface MyProps {
  label: string;
}
interface MyState {
  count: number;
}

class MyComponent extends Component<MyProps, MyState> {
  initState(): MyState {
    return { count: 0 };
  }

  render(): VNode {
    return h(
      "div",
      null,
      h("p", null, this.props.label),
      h("button", { onClick: this.increment }, `Count: ${this.state.count}`),
    );
  }

  private increment = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };
}
```

**Rules:**

- Always use arrow functions for event handlers (preserves `this`).
- `render()` must be a pure function of `this.props` and `this.state`. No side effects inside it.
- Use `this.setState(partialState)` or `this.setState(prev => newState)` to update state and trigger a re-render.

---

## The h() Function

`h(type, props, ...children)` creates a Virtual DOM node.

```ts
h(
  "div",
  { className: "card" }, // element + props
  h("h1", null, "Title"), // nested element, no props
  h(MyComponent, { label: "Hello" }), // component usage
  isVisible && h("span", null, "Hi"), // conditional (false is ignored)
  items.map(
    (
      item, // lists — always add key
    ) => h("li", { key: item.id }, item.name),
  ),
);
```

**Props notes:**

- Use `className` (not `class`) for CSS classes.
- Event handlers use camelCase: `onClick`, `onChange`, `onInput`.
- Inline styles use a style object: `{ style: { color: 'red', fontSize: '16px' } }`.
- Boolean attributes: `{ disabled: true }` → adds the attribute; `{ disabled: false }` → removes it.
- `null` or `undefined` prop values remove the attribute.
- `key` is a reserved prop for list reconciliation — never read it inside the component.

---

## Lifecycle Hooks

Override these methods as needed:

```ts
componentDidMount(): void {
  // Runs once after first render. Use for: fetch, timers, global listeners.
}

componentDidUpdate(prevProps, prevState): void {
  // Runs after every setState(). Compare prev vs current to react to specific changes.
}

componentWillUnmount(): void {
  // Runs before removal. Use for: clearInterval, removeEventListener, cleanup.
}
```

NOTE: DONT USE THESE HOOKS

---

## Mounting the App

Call `createDom()` once at startup. It returns a real DOM node. Append it manually.

```ts
import { h, createDom } from "./framework";
import { App } from "./App";

const root = document.querySelector<HTMLDivElement>("#app")!;
root.innerHTML = "";
root.appendChild(createDom(h(App, null)));
```

---

## Keyed Lists

When rendering dynamic lists, always provide a stable `key` on each child. This lets the reconciler match items by identity instead of position — preserving state and enabling efficient reordering.

```ts
render(): VNode {
  return h('ul', null,
    ...this.state.items.map(item =>
      h('li', { key: item.id }, item.name)
    )
  );
}
```

---

## Component Composition

Pass child components into `h()` just like elements. Access nested children via `this.props.children`.

```ts
class Card extends Component<{ title: string }> {
  render(): VNode {
    return h(
      "div",
      { className: "card" },
      h("h2", null, this.props.title),
      ...this.props.children, // renders whatever was passed between tags
    );
  }
}

// Usage:
h(Card, { title: "Hello" }, h("p", null, "This is a child paragraph."));
```

---

## Quick Reference

| Goal                       | How                                                  |
| -------------------------- | ---------------------------------------------------- |
| Create a vnode             | `h(type, props, ...children)`                        |
| Create a component         | `class Foo extends Component<P, S>`                  |
| Read props                 | `this.props.myProp`                                  |
| Read state                 | `this.state.myField`                                 |
| Update state               | `this.setState({ key: value })`                      |
| Update state from previous | `this.setState(prev => ({ count: prev.count + 1 }))` |
| Force re-render            | `this.forceUpdate()`                                 |
| After mount side effect    | `componentDidMount()`                                |
| Cleanup on remove          | `componentWillUnmount()`                             |
| Render a list              | `items.map(i => h('li', { key: i.id }, i.name))`     |
| Conditional render         | `condition && h('span', null, 'text')`               |
| Mount app                  | `root.appendChild(createDom(h(App, null)))`          |
