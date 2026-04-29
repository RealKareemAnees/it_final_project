import { Component, h } from "../engine";

export class ProfilePage extends Component {
  constructor(props: any = {}) {
    super(props);
  }

  render() {
    return h(
      "main",
      { className: "page profile-page" },
      h("h1", null, "Profile"),
      h("p", null, "User profile (placeholder)."),
    );
  }
}
