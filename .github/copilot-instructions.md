# Project

this project is car wiki website

# K-engine Quick Guide

## Setup

```ts
import { h, render } from "./index";
import { App } from "./App";

render(h(App, null), document.getElementById("root")!);
```

````

## Elements

```ts id="s0d7zw"
h("div", { className: "box" }, "Hello");

h(
  "button",
  {
    disabled: loading,
    style: { color: "red" },
    onClick: save,
  },
  "Save",
);
```

## Components

Extend `Component<Props, State>` and implement `render()`.

```ts id="k5zjzs"
class Counter extends Component<{}, { count: number }> {
  initState() {
    return { count: 0 };
  }

  render() {
    return h(
      "button",
      {
        onClick: () => this.setState((s) => ({ count: s.count + 1 })),
      },
      this.state.count,
    );
  }
}
```

## State

```ts id="z8m9w3"
this.setState({ loading: true });

this.setState((prev) => ({
  count: prev.count + 1,
}));

this.forceUpdate();
```

## Lifecycle

```ts id="v0g5yq"
componentDidMount();
componentDidUpdate(prevProps, prevState);
componentWillUnmount();
```

## Conditional Rendering

```ts id="nh2k5v"
this.state.error && h("p", null, "Error");

this.state.loading ? h("span", null, "Loading") : h(Content, null);
```

## Lists

Always use `key`.

```ts id="n2r6we"
items.map((item) => h("li", { key: item.id }, item.name));
```

## Props

Pass data/functions through props.

```ts id="q8h3zt"
h(Profile, {
  user: this.state.user,
  onRename: (name) => this.setState({ user: name }),
});
```

## Context

Use `ContextBase` for shared state.

```ts id="y1f8mr"
class ThemeContext extends ContextBase<{}, { dark: boolean }> {
  initState() {
    return { dark: false };
  }
}
```

Methods:

```ts id="q4x7np"
getContext();
setContext();
```

## Raw HTML

Trusted HTML only.

```ts id="e9k2la"
raw("<strong>Hello</strong>");
```

Sanitize user input before using `raw()`.

## API

- `h(type, props, ...children)` → create VNode
- `render(vnode, container)` → mount app
- `raw(html)` → inject HTML
- `Component<P,S>` → base component class
- `ContextBase<P,S>` → shared state helper

```

````
