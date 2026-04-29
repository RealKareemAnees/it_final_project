import { Component, h } from "../engine";

export class AuthPage extends Component {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return h(
      "main",
      { className: "page auth-page" },
      h("h1", null, "Sign In / Register"),
      h("p", null, "Authentication UI placeholder."),
    );
  }
}
