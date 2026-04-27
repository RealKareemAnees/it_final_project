import { Component, h } from "./framework";
import type { VNode } from "./framework";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";

type Tab = "counter" | "todo";

interface AppState {
  activeTab: Tab;
}

export class App extends Component<{}, AppState> {
  initState(): AppState {
    return { activeTab: "counter" };
  }

  private showCounter = () => {
    this.setState({ activeTab: "counter" });
  };

  private showTodoList = () => {
    this.setState({ activeTab: "todo" });
  };

  render(): VNode {
    const { activeTab } = this.state;

    return h(
      "div",
      { className: "app" },
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
      h(
        "nav",
        { className: "tabs" },
        h(
          "button",
          {
            className: "tab" + (activeTab === "counter" ? " tab--active" : ""),
            onClick: this.showCounter,
          },
          "Counter",
        ),
        h(
          "button",
          {
            className: "tab" + (activeTab === "todo" ? " tab--active" : ""),
            onClick: this.showTodoList,
          },
          "Todo List",
        ),
      ),
      h(
        "main",
        { className: "main" },
        activeTab === "counter"
          ? h(
              "div",
              { className: "counter-demo" },
              h(Counter, { label: "Basic Counter", start: 0, step: 1 }),
              h(Counter, { label: "Step by 5", start: 10, step: 5 }),
            )
          : h(TodoList, {}),
      ),
      h(
        "footer",
        { className: "footer" },
        "Built with MiniAct · Vanilla TS · No dependencies",
      ),
    );
  }
}
