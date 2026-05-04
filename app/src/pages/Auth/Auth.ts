import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import "./Auth.css";

 function validateUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

 function validatePassword(password: string): boolean {
  // Password must be at least 8 characters, contain at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

 function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


interface AuthState {
  activeTab: "login" | "signup";
}

export class AuthPage extends Component<{}, AuthState> {
  initState(): AuthState {
    return { activeTab: "login" };
  }

  handleTabClick = (tab: "login" | "signup"): void => {
    this.setState({ activeTab: tab });
  };

  handleLoginSubmit = (e: Event): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    
    if (validateUsername(username) && validatePassword(password)) {
      console.log("Login valid. Submitting...");
      // Handle actual login
      alert("Login successful!");
    } else {
      console.log("Login validation failed.");
      alert("Login validation failed. Please check your username and password.");
    }
  };

  handleSignupSubmit = (e: Event): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    
    if (validateUsername(username) && validateEmail(email) && validatePassword(password)) {
      console.log("Signup valid. Submitting...");
      // Handle actual signup
      alert("Signup successful!");
    } else {
      console.log("Signup validation failed.");
      alert("Signup validation failed. Please ensure the username is 3-20 chars, password is at least 8 chars with one letter and one number, and the email is valid.");
    }
  };

  render(): VNode {
    const { activeTab } = this.state;

    return h(
      "div",
      { className: "auth-page" },
      h(
        "div",
        { className: "auth-container" },
        h("a", { href: "/", className: "auth-logo" }, "Bergo"),
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
                onClick: () => this.handleTabClick("login") 
              },
              "Log In"
            ),
            h(
              "button",
              { 
                className: `auth-tab ${activeTab === "signup" ? "active" : ""}`, 
                "data-target": "signup",
                onClick: () => this.handleTabClick("signup") 
              },
              "Sign Up"
            )
          ),
          h(
            "form",
            { 
              id: "login-form", 
              className: `auth-form ${activeTab === "login" ? "active" : ""}`,
              onSubmit: this.handleLoginSubmit
            },
            h(
              "div",
              { className: "form-group" },
              h("label", { htmlFor: "login-username" }, "Username"),
              h("input", { type: "text", id: "login-username", name: "username", placeholder: "Enter your username", required: true })
            ),
            h(
              "div",
              { className: "form-group" },
              h("label", { htmlFor: "login-password" }, "Password"),
              h("input", { type: "password", id: "login-password", name: "password", placeholder: "Enter your password", required: true })
            ),
            h(
              "div",
              { className: "form-options" },
              h("a", { href: "#", className: "forgot-password" }, "Forgot password?")
            ),
            h("button", { type: "submit", className: "auth-submit" }, "Log In")
          ),
          h(
            "form",
            { 
              id: "signup-form", 
              className: `auth-form ${activeTab === "signup" ? "active" : ""}`,
              onSubmit: this.handleSignupSubmit
            },
            h(
              "div",
              { className: "form-group" },
              h("label", { htmlFor: "signup-username" }, "Username"),
              h("input", { type: "text", id: "signup-username", name: "username", placeholder: "Choose a username", required: true })
            ),
            h(
              "div",
              { className: "form-group" },
              h("label", { htmlFor: "signup-email" }, "Email"),
              h("input", { type: "email", id: "signup-email", name: "email", placeholder: "Enter your email", required: true })
            ),
            h(
              "div",
              { className: "form-group" },
              h("label", { htmlFor: "signup-password" }, "Password"),
              h("input", { type: "password", id: "signup-password", name: "password", placeholder: "Create a password", required: true })
            ),
            h("button", { type: "submit", className: "auth-submit" }, "Create Account")
          )
        )
      )
    );
  }
}
