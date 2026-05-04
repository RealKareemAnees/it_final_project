import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import "./Auth.css";
import type { UserInfo } from "../../types/userInfo.interface";
import { loginUser, registerUser } from "../../utils/auth.utils";
import { navigate } from "../../utils/routing.utils";

interface AuthState {
  activeTab: "login" | "signup";
  loading: boolean;
  error: string | null;
}

interface AuthProps {
  user: UserInfo | null;
}

export class AuthPage extends Component<AuthProps, AuthState> {
  initState(): AuthState {
    return { activeTab: "login", loading: false, error: null };
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

  handleLoginSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();
    if (this.state.loading) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!username || !password) {
      this.setState({ error: "Username and password are required." });
      return;
    }

    this.setState({ loading: true, error: null });
    try {
      await loginUser(username, password);
      navigate("/profile");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed.";
      this.setState({ error: message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSignupSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();
    if (this.state.loading) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!username || !password) {
      this.setState({ error: "Username and password are required." });
      return;
    }

    this.setState({ loading: true, error: null });
    try {
      await registerUser(username, password);
      navigate("/profile");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Signup failed.";
      this.setState({ error: message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render(): VNode {
    const { activeTab, loading, error } = this.state;

    return h(
      "div",
      { className: "auth-shell" },
      h(
        "div",
        { className: "auth-intro" },
        h("span", { className: "auth-eyebrow" }, "Member access"),
        h("h1", null, "Welcome to Bergo"),
        h(
          "p",
          null,
          "Create a personal garage, track favorites, and keep your wishlist in sync across devices.",
        ),
        h(
          "div",
          { className: "auth-highlights" },
          h("div", { className: "auth-highlight" }, "Curated alerts"),
          h("div", { className: "auth-highlight" }, "Private wishlist"),
          h("div", { className: "auth-highlight" }, "Saved searches"),
        ),
      ),
      h(
        "div",
        { className: "auth-panel" },
        h(
          "a",
          {
            href: "/",
            className: "auth-logo",
            onClick: (event: MouseEvent) => {
              event.preventDefault();
              navigate("/");
            },
          },
          "Bergo",
        ),
        h(
          "div",
          { className: "auth-box" },
          error ? h("div", { className: "auth-error" }, error) : null,
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
            h(
              "button",
              { type: "submit", className: "auth-submit" },
              loading ? "Logging in..." : "Log In",
            ),
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
              loading ? "Creating..." : "Create Account",
            ),
          ),
        ),
      ),
    );
  }
}
