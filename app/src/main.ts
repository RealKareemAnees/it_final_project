import { h, createDom } from "./engine";
import { App } from "./App";

const root = document.querySelector<HTMLDivElement>("#app")!;
root.innerHTML = "";

// Render the MiniAct Virtual DOM into the Real DOM
const appElement = createDom(h(App, null));
root.appendChild(appElement);
