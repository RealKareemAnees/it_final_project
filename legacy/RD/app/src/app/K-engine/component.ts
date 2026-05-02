import type { Props, VNode } from "./types";

export abstract class Component<
  P extends Props = Props,
  S extends Props = Props,
> {
  props: P;
  state: S;

  // @internal Wired up by the renderer. Triggers a re-render.
  _invalidate: (() => void) | null = null;

  constructor(props: P) {
    this.props = props;
    this.state = this.initState();
  }

  // Override to provide initial state.
  initState(): S {
    return {} as S;
  }

  // Return a VNode tree describing what this component looks like.
  abstract render(): VNode;

  // Update state and re-render.
  // @example this.setState({ count: 0 })
  // @example this.setState(prev => ({ count: prev.count + 1 }))
  setState(updater: Partial<S> | ((prev: S) => Partial<S>)): void {
    const prevProps = this.props;
    const prevState = { ...this.state };
    const patch = typeof updater === "function" ? updater(this.state) : updater;
    this.state = { ...this.state, ...patch };
    this._invalidate?.();
    this.componentDidUpdate(prevProps, prevState);
  }

  // Force a re-render without changing state.
  forceUpdate(): void {
    this._invalidate?.();
  }

  // Called after the component is first added to the DOM.
  componentDidMount(): void {}

  // Called after every setState() call.
  componentDidUpdate(_prevProps: P, _prevState: S): void {}

  // Called before the component is removed from the DOM. Use for cleanup.
  componentWillUnmount(): void {}
}
