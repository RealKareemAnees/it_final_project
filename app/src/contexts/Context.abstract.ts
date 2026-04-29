import type { Component } from "../engine";

export type ContextListener<S> = (
  nextState: Readonly<S>,
  prevState: Readonly<S>,
) => void;

export interface SubscribeOptions {
  emitOnSubscribe?: boolean;
}

export interface BindComponentOptions<S> {
  selector?: (state: Readonly<S>) => unknown;
  emitOnBind?: boolean;
}

export abstract class ContextAbstract<S extends Record<string, unknown>> {
  private _state: S;
  private readonly listeners = new Set<ContextListener<S>>();

  protected constructor() {
    this._state = this.initState();
  }

  protected abstract initState(): S;

  getState(): Readonly<S> {
    return this._state;
  }

  setState(updater: Partial<S> | ((prev: Readonly<S>) => Partial<S>)): void {
    const prevState = this._state;
    const patch = typeof updater === "function" ? updater(prevState) : updater;
    const nextState = { ...prevState, ...patch };
    this._state = nextState;
    this.emit(nextState, prevState);
  }

  replaceState(updater: S | ((prev: Readonly<S>) => S)): void {
    const prevState = this._state;
    const nextState =
      typeof updater === "function" ? updater(prevState) : updater;
    this._state = nextState;
    this.emit(nextState, prevState);
  }

  subscribe(
    listener: ContextListener<S>,
    options: SubscribeOptions = {},
  ): () => void {
    this.listeners.add(listener);

    if (options.emitOnSubscribe) {
      listener(this._state, this._state);
    }

    return () => {
      this.listeners.delete(listener);
    };
  }

  bindComponent(
    component: Component,
    options: BindComponentOptions<S> = {},
  ): () => void {
    const selector = options.selector;

    const unsubscribe = this.subscribe(
      (nextState, prevState) => {
        if (!selector) {
          component.forceUpdate();
          return;
        }

        const nextSelected = selector(nextState);
        const prevSelected = selector(prevState);
        if (!Object.is(nextSelected, prevSelected)) {
          component.forceUpdate();
        }
      },
      { emitOnSubscribe: options.emitOnBind },
    );

    const originalWillUnmount = component.componentWillUnmount.bind(component);
    component.componentWillUnmount = () => {
      unsubscribe();
      originalWillUnmount();
    };

    return unsubscribe;
  }

  private emit(nextState: S, prevState: S): void {
    for (const listener of this.listeners) {
      listener(nextState, prevState);
    }
  }
}
