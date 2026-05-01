import { Component, type Props } from "../engine";

export type ContextUpdater<S> = Partial<S> | ((prev: S) => Partial<S>);

export abstract class ContextBase<
  P extends Props = Props,
  S extends Props = Props,
> extends Component<P, S> {
  getContext = (): S => this.state;

  setContext = (updates: ContextUpdater<S>): void => {
    this.setState(updates);
  };
}
