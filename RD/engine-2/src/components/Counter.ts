import { Component, h } from "../framework";
import type { ComponentInput, VNode } from "../framework";

interface CounterProps {
  label?: string;
  start?: number;
  step?: number;
}

interface CounterState {
  count: number;
}

export class Counter extends Component<CounterProps, CounterState> {
  initState(): CounterState {
    return { count: this.props.start ?? 0 };
  }

  componentDidMount(): void {
    console.log("Counter mounted! Initial count:", this.state.count);
  }

  componentDidUpdate(
    _prevProps: ComponentInput<CounterProps>,
    prevState: CounterState,
  ): void {
    console.log(`Count changed: ${prevState.count} → ${this.state.count}`);
  }

  componentWillUnmount(): void {
    console.log("Counter unmounted.");
  }

  private getStep(): number {
    return this.props.step ?? 1;
  }

  private getStartValue(): number {
    return this.props.start ?? 0;
  }

  private increment = () => {
    this.setState((prev) => ({ count: prev.count + this.getStep() }));
  };

  private decrement = () => {
    this.setState((prev) => ({ count: prev.count - this.getStep() }));
  };

  private reset = () => {
    this.setState({ count: this.getStartValue() });
  };

  render(): VNode {
    const { label = "Counter" } = this.props;
    const { count } = this.state;

    return h(
      "div",
      { className: "counter card" },
      h("h2", { className: "counter__label" }, label),
      h(
        "div",
        { className: "counter__value" + (count < 0 ? " negative" : "") },
        String(count),
      ),
      h(
        "div",
        { className: "counter__controls" },
        h("button", { className: "btn", onClick: this.decrement }, "−"),
        h(
          "button",
          { className: "btn btn--ghost", onClick: this.reset },
          "Reset",
        ),
        h("button", { className: "btn", onClick: this.increment }, "+"),
      ),
    );
  }
}
