import { Component, h } from "./engine";

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
        h(
          "p",
          { className: "header__sub" },
          "A React-like framework in vanilla TS",
        ),
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
          "🔢 Counter",
        ),
        h(
          "button",
          {
            className: "tab" + (activeTab === "todo" ? " tab--active" : ""),
            onClick: () => this.setState({ activeTab: "todo" }),
          },
          "✅ Todo List",
        ),
      ),

      // ── Footer ────────────────────────────────────────────────────────
      h(
        "footer",
        { className: "footer" },
        "Built with MiniAct · Vanilla TS · No dependencies",
      ),

      (() => {
        switch (activeTab) {
          case "counter":
            return h(
              "div",
              { className: "content" },
              h("h2", null, "Counter"),
              h(
                "p",
                null,
                "A simple counter component to demonstrate state management.",
              ),
              h(
                "button",
                {
                  onClick: () =>
                    alert("Counter clicked! (Implement your logic here)"),
                },
                "Click Me",
              ),
            );
          case "todo":
            return h(
              "div",
              { className: "content" },
              h("h2", null, "Todo List"),
              h(
                "p",
                null,
                "A simple todo list component to demonstrate dynamic rendering.",
              ),
              h(
                "button",
                {
                  onClick: () =>
                    alert("Todo List clicked! (Implement your logic here)"),
                },
                "Click Me",
              ),
            );
          default:
            return null;
        }
      })(),
    );
  }
}
