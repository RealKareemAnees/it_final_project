import type { VNode } from "../engine";
import { ContextBase, type ContextUpdater } from "./Context.base";

export interface GlobalContextProps {
  render: (
    context: GlobalContextState,
    setContext: (updates: ContextUpdater<GlobalContextState>) => void,
  ) => VNode;
}

export interface GlobalContextState {
  counter: number;
}

export class GlobalContext extends ContextBase<
  GlobalContextProps,
  GlobalContextState
> {
  initState(): GlobalContextState {
    return { counter: 0 };
  }

  render(): VNode {
    return this.props.render(this.getContext(), this.setContext);
  }
}
