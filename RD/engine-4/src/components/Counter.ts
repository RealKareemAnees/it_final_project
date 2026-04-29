// ============================================================
//  Counter – demonstrates: state, setState, events, conditional render
// ============================================================

import { Component, h } from "../framework";

interface CounterProps {
  label?: string;
  start?: number;
  step?: number;
}

interface CounterState {
  count: number;
}

export class Counter extends Component<CounterProps, CounterState> {
  // ── Initial state ────────────────────────────────────────────────────────
  initState(): CounterState {
    return { count: this.props.start ?? 0 };
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────
  componentDidMount(): void {
    console.log("Counter mounted! Initial count:", this.state.count);
  }

  componentDidUpdate(_prevProps: CounterProps, prevState: CounterState): void {
    console.log(`Count changed: ${prevState.count} → ${this.state.count}`);
  }

  componentWillUnmount(): void {
    console.log("Counter unmounted.");
  }

  // ── Handlers ─────────────────────────────────────────────────────────────
  private increment = () => {
    // Functional updater guarantees we read the latest state
    this.setState((prev) => ({ count: prev.count + (this.props.step ?? 1) }));
  };

  private decrement = () => {
    this.setState((prev) => ({ count: prev.count - (this.props.step ?? 1) }));
  };

  private reset = () => {
    this.setState({ count: this.props.start ?? 0 });
  };

  // ── Render ───────────────────────────────────────────────────────────────
  render() {
    const { label = "Counter" } = this.props;
    const { count } = this.state;

    return h(
      "div",
      { className: "counter card" },
      h("h2", { className: "counter__label" }, label),
      h(
        "div",
        { className: "counter__value" + (count < 0 ? " negative" : "") },
        String(count)
      ),
      h(
        "div",
        { className: "counter__controls" },
        h("button", { className: "btn", onClick: this.decrement }, "−"),
        h(
          "button",
          { className: "btn btn--ghost", onClick: this.reset },
          "Reset"
        ),
        h("button", { className: "btn", onClick: this.increment }, "+")
      )
    );
  }
}
