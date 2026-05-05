# K-engine — Usage Guide

K-engine is a minimal React-like library for small apps. It covers components, state, lifecycle hooks, prop drilling, context, and raw HTML injection. There is no build step requirement beyond TypeScript.

---

## Setup

```ts
import { h, render } from "./index";
import { App } from "./App";

render(h(App, null), document.getElementById("root")!);
```

`render(vnode, container)` wipes the container and mounts the tree. Call it once at startup.

---

## `h()` — Creating elements

`h()` is the equivalent of `React.createElement`. It accepts a tag name or Component class, a props object (or `null`), and any number of children.

```ts
h("div", { className: "box" }, "Hello");
h("input", { type: "text", value: name, onInput: handleInput });
h(
  "ul",
  null,
  items.map((item) => h("li", { key: item.id }, item.label)),
);
```

Boolean props set/remove the HTML attribute:

```ts
h("button", { disabled: isLoading }, "Save");
```

Style accepts an object:

```ts
h("div", { style: { color: "red", fontSize: "14px" } }, "Alert");
```

---

## Components

Extend `Component<Props, State>`. You must implement `render()`. Everything else is optional.

```ts
import { Component, h } from "./index";

interface P {
  title: string;
}
interface S {
  open: boolean;
}

class Accordion extends Component<P, S> {
  initState(): S {
    return { open: false };
  }

  render() {
    return h(
      "div",
      null,
      h(
        "button",
        { onClick: () => this.setState((s) => ({ open: !s.open })) },
        this.props.title,
      ),
      this.state.open && h("p", null, this.props.children as any),
    );
  }
}
```

### `setState`

Accepts a partial state object or an updater function. Always prefer the updater function when the new value depends on the previous one.

```ts
// Object form — fine for independent values
this.setState({ loading: true });

// Updater form — safe for derived values
this.setState((prev) => ({ count: prev.count + 1 }));
```

### `forceUpdate`

Triggers a re-render without touching state. Useful when you mutate an external object and want to reflect it.

```ts
this.externalList.push(item);
this.forceUpdate();
```

---

## Lifecycle Hooks

| Hook                                       | When it fires                                         |
| ------------------------------------------ | ----------------------------------------------------- |
| `componentDidMount()`                      | After first mount (good for fetch, timers, listeners) |
| `componentDidUpdate(prevProps, prevState)` | After every `setState` call                           |
| `componentWillUnmount()`                   | Before the component is removed from the DOM          |

```ts
class Clock extends Component<{}, { time: string }> {
  private timer!: ReturnType<typeof setInterval>;

  initState() {
    return { time: new Date().toLocaleTimeString() };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return h("p", null, this.state.time);
  }
}
```

---

## Conditional Rendering

Use `&&` or a ternary inside `h()`. Falsy values (`false`, `null`, `undefined`) are automatically filtered out.

```ts
render() {
  return h("div", null,
    this.state.error   && h("p", { className: "error" }, this.state.error),
    this.state.loading ? h("span", null, "Loading…") : h(Content, null)
  );
}
```

---

## Lists

Map over an array and pass a `key` prop so re-renders replace the right nodes.

```ts
render() {
  return h("ul", null,
    this.props.items.map(item =>
      h("li", { key: item.id }, item.name)
    )
  );
}
```

---

## Prop Drilling

Pass data down through `props` at each level. This is the simplest approach and works well up to ~3 levels deep.

```ts
// Root owns the state and passes handler down
class App extends Component<{}, { user: string }> {
  initState() {
    return { user: "Alice" };
  }

  render() {
    return h(Profile, {
      user: this.state.user,
      onRename: (n: string) => this.setState({ user: n }),
    });
  }
}

// Middle layer just forwards props
class Profile extends Component<{
  user: string;
  onRename: (n: string) => void;
}> {
  render() {
    return h(
      "div",
      null,
      h("h2", null, this.props.user),
      h(RenameButton, { onRename: this.props.onRename }),
    );
  }
}

// Leaf uses the handler
class RenameButton extends Component<{ onRename: (n: string) => void }> {
  render() {
    return h("button", { onClick: () => this.props.onRename("Bob") }, "Rename");
  }
}
```

When drilling becomes unwieldy (many levels, many props), switch to Context.

---

## Context

Context lets any descendant read or update shared state without threading props through every layer. Extend `ContextBase` for the provider, then pass `getContext` and `setContext` down once (typically in the root `render`).

```ts
// context/ThemeContext.ts
import { ContextBase } from "./Context";

interface ThemeState {
  dark: boolean;
}

export class ThemeContext extends ContextBase<{}, ThemeState> {
  initState(): ThemeState {
    return { dark: false };
  }

  render() {
    // ContextBase has no visual output — render children directly.
    // Pass getContext/setContext so descendants can reach shared state.
    return h(
      "div",
      null,
      ...(this.props.children as any[]).map((child) =>
        // Clone child, injecting context props
        typeof child === "object"
          ? h(
              child.type,
              {
                ...child.props,
                getTheme: this.getContext,
                setTheme: this.setContext,
              },
              ...child.children,
            )
          : child,
      ),
    );
  }
}
```

> **Simpler pattern:** for small apps, skip the clone trick — pass `getContext` / `setContext` as explicit props from a single top-level owner instead, which is just structured prop drilling with a named boundary.

```ts
// App.ts — straightforward context wiring
class App extends Component {
  private theme = new ThemeContext({}); // owns the state

  render() {
    return h(
      "div",
      null,
      h(Toolbar, {
        getTheme: this.theme.getContext,
        setTheme: this.theme.setContext,
      }),
    );
  }
}

// Toolbar.ts — consumes context props
class Toolbar extends Component<{
  getTheme: () => { dark: boolean };
  setTheme: (u: any) => void;
}> {
  render() {
    const { dark } = this.props.getTheme();
    return h(
      "header",
      { className: dark ? "dark" : "light" },
      h(
        "button",
        { onClick: () => this.props.setTheme((p: any) => ({ dark: !p.dark })) },
        "Toggle theme",
      ),
    );
  }
}
```

---

## Raw HTML (`raw()`)

Inject a trusted HTML string directly into the DOM. Renders as a `<span>` wrapper with `innerHTML` set.

```ts
import { h, raw } from "./index";
```

```ts
// Static markup
h("div", null, raw("<strong>Important</strong> notice"));

// Rendered Markdown (from a library like marked)
h("article", null, raw(marked(post.body)));

// Server-provided snippet
h("div", { className: "embed" }, raw(this.props.htmlSnippet));
```

> **Warning:** `raw()` does not sanitise its input. Never pass user-submitted content without running it through a sanitiser like [DOMPurify](https://github.com/cure53/DOMPurify) first:
>
> ```ts
> import DOMPurify from "dompurify";
> raw(DOMPurify.sanitize(userInput));
> ```

---

## Full Example — Todo App

A self-contained example combining state, lists, conditional rendering, and a lifecycle hook.

```ts
import { Component, h, render } from "./index";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}
interface S {
  todos: Todo[];
  input: string;
  nextId: number;
}

class TodoApp extends Component<{}, S> {
  initState(): S {
    return { todos: [], input: "", nextId: 1 };
  }

  componentDidMount() {
    const saved = localStorage.getItem("todos");
    if (saved) this.setState({ todos: JSON.parse(saved) });
  }

  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  add() {
    const text = this.state.input.trim();
    if (!text) return;
    this.setState((s) => ({
      todos: [...s.todos, { id: s.nextId, text, done: false }],
      input: "",
      nextId: s.nextId + 1,
    }));
  }

  toggle(id: number) {
    this.setState((s) => ({
      todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));
  }

  remove(id: number) {
    this.setState((s) => ({ todos: s.todos.filter((t) => t.id !== id) }));
  }

  render() {
    const { todos, input } = this.state;
    const remaining = todos.filter((t) => !t.done).length;

    return h(
      "div",
      { className: "todo-app" },
      h("h1", null, "Todos"),
      h("p", null, `${remaining} remaining`),

      h(
        "div",
        { className: "input-row" },
        h("input", {
          type: "text",
          value: input,
          onInput: (e: InputEvent) =>
            this.setState({ input: (e.target as HTMLInputElement).value }),
          onKeyDown: (e: KeyboardEvent) => e.key === "Enter" && this.add(),
          placeholder: "What needs doing?",
        }),
        h("button", { onClick: () => this.add() }, "Add"),
      ),

      todos.length === 0
        ? h("p", { className: "empty" }, "Nothing yet — add something!")
        : h(
            "ul",
            null,
            todos.map((todo) =>
              h(
                "li",
                { key: todo.id, className: todo.done ? "done" : "" },
                h("input", {
                  type: "checkbox",
                  checked: todo.done,
                  onChange: () => this.toggle(todo.id),
                }),
                h("span", null, todo.text),
                h("button", { onClick: () => this.remove(todo.id) }, "✕"),
              ),
            ),
          ),
    );
  }
}

render(h(TodoApp, null), document.getElementById("root")!);
```

---

## API Reference

### `h(type, props, ...children): VNode`

Creates a virtual DOM node. `type` is a tag string or Component class. `props` may be `null`.

### `raw(html: string): VNode`

Injects a raw HTML string. Rendered as a `<span>` with `innerHTML`. Unsanitised — treat as trusted input only.

### `render(vnode, container): void`

Mounts a VNode tree into a real DOM container, replacing any existing content.

### `Component<P, S>`

Base class for all components. Override `initState()`, `render()`, and any lifecycle hooks as needed.

| Member                       | Type   | Description                       |
| ---------------------------- | ------ | --------------------------------- |
| `props`                      | `P`    | Received from parent              |
| `state`                      | `S`    | Internal state                    |
| `setState(updater)`          | `void` | Updates state and re-renders      |
| `forceUpdate()`              | `void` | Re-renders without touching state |
| `componentDidMount()`        | hook   | After first mount                 |
| `componentDidUpdate(pp, ps)` | hook   | After each `setState`             |
| `componentWillUnmount()`     | hook   | Before removal                    |

### `ContextBase<P, S>`

Extends `Component`. Adds `getContext()` and `setContext()` for sharing state without deep prop drilling.
