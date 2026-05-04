import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import "./Auth.css";

interface AuthState {
  activeTab: "login" | "signup";
}

export class AuthPage extends Component<{}, AuthState> {
  initState(): AuthState {
    return { activeTab: "login" };
  }

  componentDidMount(): void {
    document.title = "Authentication - Bergo";
    document.body.classList.add("auth-page");
  }

  componentWillUnmount(): void {
    document.body.classList.remove("auth-page");
  }

  handleTabClick = (tab: "login" | "signup"): void => {
    this.setState({ activeTab: tab });
  };

  handleLoginSubmit = (e: Event): void => {
    e.preventDefault();
    console.log("Login submitted");
  };

  handleSignupSubmit = (e: Event): void => {
    e.preventDefault();
    console.log("Signup submitted");
  };

  render(): VNode {
    const { activeTab } = this.state;

    return h(
      "div",
      { className: "auth-container" },
      h("a", { href: "../home/home.html", className: "auth-logo" }, "Bergo"),
      h(
        "div",
        { className: "auth-box" },
        h(
          "div",
          { className: "auth-tabs" },
          h(
            "button",
            {
              className: `auth-tab ${activeTab === "login" ? "active" : ""}`,
              "data-target": "login",
              onClick: () => this.handleTabClick("login"),
            },
            "Log In",
          ),
          h(
            "button",
            {
              className: `auth-tab ${activeTab === "signup" ? "active" : ""}`,
              "data-target": "signup",
              onClick: () => this.handleTabClick("signup"),
            },
            "Sign Up",
          ),
        ),
        h(
          "form",
          {
            id: "login-form",
            className: `auth-form ${activeTab === "login" ? "active" : ""}`,
            onSubmit: this.handleLoginSubmit,
          },
          h(
            "div",
            { className: "form-group" },
            h("label", { htmlFor: "login-username" }, "Username"),
            h("input", {
              type: "text",
              id: "login-username",
              name: "username",
              placeholder: "Enter your username",
              required: true,
            }),
          ),
          h(
            "div",
            { className: "form-group" },
            h("label", { htmlFor: "login-password" }, "Password"),
            h("input", {
              type: "password",
              id: "login-password",
              name: "password",
              placeholder: "Enter your password",
              required: true,
            }),
          ),
          h(
            "div",
            { className: "form-options" },
            h(
              "a",
              { href: "#", className: "forgot-password" },
              "Forgot password?",
            ),
          ),
          h("button", { type: "submit", className: "auth-submit" }, "Log In"),
        ),
        h(
          "form",
          {
            id: "signup-form",
            className: `auth-form ${activeTab === "signup" ? "active" : ""}`,
            onSubmit: this.handleSignupSubmit,
          },
          h(
            "div",
            { className: "form-group" },
            h("label", { htmlFor: "signup-username" }, "Username"),
            h("input", {
              type: "text",
              id: "signup-username",
              name: "username",
              placeholder: "Choose a username",
              required: true,
            }),
          ),
          h(
            "div",
            { className: "form-group" },
            h("label", { htmlFor: "signup-email" }, "Email"),
            h("input", {
              type: "email",
              id: "signup-email",
              name: "email",
              placeholder: "Enter your email",
              required: true,
            }),
          ),
          h(
            "div",
            { className: "form-group" },
            h("label", { htmlFor: "signup-password" }, "Password"),
            h("input", {
              type: "password",
              id: "signup-password",
              name: "password",
              placeholder: "Create a password",
              required: true,
            }),
          ),
          h(
            "button",
            { type: "submit", className: "auth-submit" },
            "Create Account",
          ),
        ),
      ),
    );
  }
}
