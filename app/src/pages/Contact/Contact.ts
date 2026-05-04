import { Component, h } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import { apiFetch } from "../../utils/api.utils";

interface ContactState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export class ContactPage extends Component<{}, ContactState> {
  initState(): ContactState {
    return { loading: false, success: false, error: null };
  }

  componentDidMount(): void {
    document.title = "Contact - Bergo";
  }

  private handleSubmit = async (event: Event): Promise<void> => {
    event.preventDefault();
    if (this.state.loading) return;

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      this.setState({ error: "All fields are required." });
      return;
    }

    this.setState({ loading: true, success: false, error: null });
    try {
      await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
      });
      form.reset();
      this.setState({ success: true });
    } catch (error) {
      const messageText =
        error instanceof Error ? error.message : "Failed to send message.";
      this.setState({ error: messageText });
    } finally {
      this.setState({ loading: false });
    }
  };

  render(): VNode {
    const { loading, success, error } = this.state;

    return h(
      "div",
      { className: "page-section contact-page" },
      h(
        "div",
        { className: "page-header contact-header" },
        h("span", { className: "page-eyebrow" }, "Contact"),
        h("h1", null, "Tell us what you are looking for"),
        h(
          "p",
          null,
          "Share the model, budget, or details you care about. We will guide you to the right options.",
        ),
      ),
      h(
        "div",
        { className: "contact-layout" },
        h(
          "div",
          { className: "contact-info" },
          h(
            "div",
            { className: "contact-card" },
            h("h3", null, "Email us"),
            h("p", null, "hello@bergo.com"),
            h("span", { className: "contact-note" }, "Reply within 24 hours"),
          ),
          h(
            "div",
            { className: "contact-card" },
            h("h3", null, "Call"),
            h("p", null, "+1 (415) 555-0182"),
            h("span", { className: "contact-note" }, "Mon - Fri, 9am - 6pm"),
          ),
          h(
            "div",
            { className: "contact-card" },
            h("h3", null, "Studio"),
            h("p", null, "88 Market St, San Francisco"),
            h("span", { className: "contact-note" }, "Visits by appointment"),
          ),
          h(
            "div",
            { className: "contact-steps" },
            h("h3", null, "What happens next"),
            h(
              "ul",
              { className: "contact-list" },
              h("li", null, "We review your request within 1 business day."),
              h(
                "li",
                null,
                "A specialist follows up with options and pricing.",
              ),
              h("li", null, "Book a viewing or save the shortlist for later."),
            ),
          ),
        ),
        h(
          "form",
          {
            className: "contact-form contact-form--panel",
            onSubmit: this.handleSubmit,
          },
          h(
            "div",
            { className: "field" },
            h("label", { htmlFor: "contact-name" }, "Name"),
            h("input", {
              id: "contact-name",
              name: "name",
              type: "text",
              placeholder: "Your name",
              required: true,
            }),
          ),
          h(
            "div",
            { className: "field" },
            h("label", { htmlFor: "contact-email" }, "Email"),
            h("input", {
              id: "contact-email",
              name: "email",
              type: "email",
              placeholder: "you@email.com",
              required: true,
            }),
          ),
          h(
            "div",
            { className: "field" },
            h("label", { htmlFor: "contact-message" }, "Message"),
            h("textarea", {
              id: "contact-message",
              name: "message",
              placeholder: "What can we help with?",
              rows: 5,
              required: true,
            }),
          ),
          error ? h("p", { className: "page-error" }, error) : null,
          success
            ? h(
                "p",
                { className: "page-success" },
                "Message sent. We will reply soon.",
              )
            : null,
          h(
            "button",
            { type: "submit", className: "primary-button", disabled: loading },
            loading ? "Sending..." : "Send Message",
          ),
        ),
      ),
    );
  }
}
