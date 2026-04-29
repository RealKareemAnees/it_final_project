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

  // The actual DOM node that this component currently owns. After Counter mounts, _root points to the <div class="counter card"> element in the real DOM. When state changes and the component re-renders, the renderer updates this to point to the new root (in case it had to be replaced).
  _root: Element | null = null;

  // A snapshot of the last VNode tree this component produced. This is what the diffing algorithm compares against. Without it, we couldn't know what the DOM was before — we'd have to read it back from the DOM, which is slow and lossy.
  _renderedVNode: VNode | null = null;

  // A callback injected by the renderer that, when called, triggers a re-render of this component. This solves a circular dependency problem:
  // component.ts can't import from renderer.ts (that would be a circular import)
  // But setState needs to trigger the renderer
  // Solution: the renderer injects the callback into the component after mounting
  // This pattern is called dependency injection — instead of Component knowing about the Renderer, the Renderer gives Component exactly the one function it needs.
  _doReconcile: (() => void) | null = null;

  // The constructor takes props, stores them, and calls initState() to get the initial state. Note that initState() is called before componentDidMount() — the component's state is ready before it touches the DOM.
  constructor(props: P) {
    this.props = props;
    this.state = this.initState();
  }

  // Why initState() instead of setting this.state = ... directly?
  // Because initState() can use this.props:
  initState(): S {
    return {} as S;
  }

  // The one method every component must implement. It must return a VNode describing the component's UI. It's abstract so TypeScript will give a compile error if you forget to implement it in a subclass.
  abstract render(): VNode;

  /** Update state and trigger a re-render. */
  setState(
    // setState can take either a partial state object or a function that produces a partial state object based on the previous state. This is similar to React's setState API.
    updater: Partial<S> | ((prev: S) => Partial<S>),
  ): void {
    const prevProps = this.props;
    const prevState = { ...this.state };
    const patch = typeof updater === "function" ? updater(this.state) : updater;

    //Spreads the old state and then the patch on top. This means setState({ filter: "done" }) on a TodoList doesn't wipe out todos and inputValue — it merges the patch. Identical to how React's class component setState works. THIS CLEARES DUPLICATE PROPERTIES IN THE PATCH, NOT THE ORIGINAL STATE. So if you do setState({ count: 5, count: 10 }), the result will be { ...state, count: 10 }.
    this.state = { ...this.state, ...patch };

    // Call the injected callback to trigger a re-render. This is the key to making state updates work without coupling Component to Renderer.
    this._doReconcile?.();

    // Call componentDidUpdate with the previous props and state. This is a lifecycle hook that subclasses can override to run code after updates. Note that we call it after triggering the re-render, so the new state is already in place when componentDidUpdate runs.
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
