// ============================================================
//  MiniAct – Component Base Class
// ============================================================

import type { Props, VNode } from "./types";

export abstract class Component<
  P extends Props = Props,
  S extends Props = Props,
> {
  props: P;
  state: S;

  // Set by the renderer after mounting (avoids circular import)
  _root: Element | null = null;
  _renderedVNode: VNode | null = null;
  _doReconcile: (() => void) | null = null;

  constructor(props: P) {
    this.props = props;
    this.state = this.initState();
  }

  /**
   * Return the initial state.
   * @example  initState() { return { count: 0 }; }
   */
  initState(): S {
    return {} as S;
  }

  /** Return a VNode tree describing the UI. Called on mount + after setState. */
  abstract render(): VNode;

  /**
   * Update state and trigger re-render.
   * @example
   *   this.setState({ count: 5 });
   *   this.setState(prev => ({ count: prev.count + 1 }));
   */
  setState(updater: Partial<S> | ((prev: S) => Partial<S>)): void {
    const prevProps = this.props;
    const prevState = { ...this.state };
    const patch = typeof updater === "function" ? updater(this.state) : updater;
    this.state = { ...this.state, ...patch };
    this._doReconcile?.();
    this.componentDidUpdate(prevProps, prevState);
  }

  /** Force a re-render without changing state. */
  forceUpdate(): void {
    this._doReconcile?.();
  }

  // ── Lifecycle hooks (override as needed) ───────────────────────────────

  /** Called after first mount. Good for: fetch, timers, global listeners. */
  componentDidMount(): void {}

  /** Called after every setState() re-render. */
  componentDidUpdate(_prevProps: P, _prevState: S): void {}

  /** Called before removal from DOM. Good for: cleanup. */
  componentWillUnmount(): void {}
}
