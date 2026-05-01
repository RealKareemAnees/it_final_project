import { GlobalContext } from "./contexts/Global.context";
import { Component, h } from "./engine";
import { AppRouter } from "./routers/App.router";
import type { GlobalContextState } from "./contexts/Global.context";
import type { ContextUpdater } from "./contexts/Context.base";

interface AppState {
  currentPage: "home" | "about" | "contact" | "wishlist";
}

export class App extends Component<{}, AppState> {
  initState(): AppState {
    return { currentPage: "home" };
  }

  render() {
    return h(GlobalContext, {
      render: (
        context: GlobalContextState,
        setContext: (updates: ContextUpdater<GlobalContextState>) => void,
      ) => h(AppRouter, { context, setContext }),
    });
  }
}
