// ============================================================
//  App – Root component, composes Counter and TodoList
//  Demonstrates: component composition, conditional rendering
// ============================================================

import { Component, h } from "./framework";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";

interface AppState {
  activeTab: "counter" | "todo";
}

export class App extends Component<{}, AppState> {
  initState(): AppState {
    return { activeTab: "counter" };
  }

  render() {
    const { activeTab } = this.state;

    return h(
      "div",
      { className: "app" },

      // ── Header ────────────────────────────────────────────────────────
      h(
        "header",
        { className: "header" },
        h("div", { className: "header__logo" }, "⚡ MiniAct"),
        h("p", { className: "header__sub" }, "A React-like framework in vanilla TS")
      ),

      // ── Tabs ──────────────────────────────────────────────────────────
      h(
        "nav",
        { className: "tabs" },
        h(
          "button",
          {
            className: "tab" + (activeTab === "counter" ? " tab--active" : ""),
            onClick: () => this.setState({ activeTab: "counter" }),
          },
          "🔢 Counter"
        ),
        h(
          "button",
          {
            className: "tab" + (activeTab === "todo" ? " tab--active" : ""),
            onClick: () => this.setState({ activeTab: "todo" }),
          },
          "✅ Todo List"
        )
      ),

      // ── Active panel ──────────────────────────────────────────────────
      h(
        "main",
        { className: "main" },
        activeTab === "counter"
          ? h(
              "div",
              { className: "counter-demo" },
              h(Counter, { label: "Basic Counter", start: 0, step: 1 }),
              h(Counter, { label: "Step by 5", start: 10, step: 5 })
            )
          : h(TodoList, {})
      ),

      // ── Footer ────────────────────────────────────────────────────────
      h(
        "footer",
        { className: "footer" },
        "Built with MiniAct · Vanilla TS · No dependencies"
      )
    );
  }
}
