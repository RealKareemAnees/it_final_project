import { Component, h, raw } from "../K-engine";
import type { VNode } from "../K-engine/types";
import { navigate } from "../utils/routing.utils";

export class NavBar extends Component {
  private headerEl: HTMLElement | null = null;
  private mobileMenuBtn: HTMLButtonElement | null = null;
  private mobileNav: HTMLElement | null = null;

  private handleScroll = (): void => {
    if (!this.headerEl) return;
    this.headerEl.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  private handleDocumentClick = (event: MouseEvent): void => {
    if (!this.mobileNav || !this.mobileMenuBtn) return;
    const target = event.target as Node;
    if (
      !this.mobileNav.contains(target) &&
      !this.mobileMenuBtn.contains(target)
    ) {
      this.closeMenu();
    }
  };

  private handleMenuClick = (event: MouseEvent): void => {
    event.stopPropagation();
    if (!this.mobileNav) return;
    const isActive = this.mobileNav.classList.toggle("active");
    this.updateMenuButtonState(isActive);
  };

  private handleMobileLinkClick = (): void => {
    this.closeMenu();
  };

  componentDidMount(): void {
    this.initHeader();
  }

  componentWillUnmount(): void {
    this.teardownHeader();
  }

  private initHeader(): void {
    this.headerEl = document.querySelector(".header");
    this.mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    this.mobileNav = document.querySelector(".mobile-nav");

    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();

    if (this.mobileMenuBtn && this.mobileNav) {
      this.mobileMenuBtn.addEventListener("click", this.handleMenuClick);
      this.mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", this.handleMobileLinkClick);
      });
      document.addEventListener("click", this.handleDocumentClick);
    }
  }

  private teardownHeader(): void {
    window.removeEventListener("scroll", this.handleScroll);
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.removeEventListener("click", this.handleMenuClick);
    }
    if (this.mobileNav) {
      this.mobileNav.querySelectorAll("a").forEach((link) => {
        link.removeEventListener("click", this.handleMobileLinkClick);
      });
    }
    document.removeEventListener("click", this.handleDocumentClick);
  }

  private updateMenuButtonState(isActive: boolean): void {
    if (!this.mobileMenuBtn) return;
    const spans = this.mobileMenuBtn.querySelectorAll("span");
    if (spans.length < 3) return;
    if (isActive) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  }

  private closeMenu(): void {
    if (!this.mobileNav) return;
    this.mobileNav.classList.remove("active");
    this.updateMenuButtonState(false);
  }

  render(): VNode {
    return h(
      "div",
      null,
      h(
        "header",
        { className: "header" },
        h("div", { className: "logo", onClick: () => navigate("/") }, "Bergo"),
        h(
          "nav",
          { className: "desktop-nav" },
          h("a", { href: "#" }, "Vehicles"),
          h("a", { href: "#" }, "Energy"),
          h("a", { href: "#" }, "Charging"),
          h("a", { href: "#" }, "Discover"),
          h("a", { href: "#" }, "Shop"),
        ),
        h(
          "div",
          { className: "header-right" },
          h(
            "button",
            { className: "chat-btn" },
            "Let's Chat ",
            h("span", { className: "arrow-icon" }, raw("&nearr;")),
          ),
          h(
            "button",
            { className: "mobile-menu-btn", "aria-label": "Open menu" },
            h("span", null),
            h("span", null),
            h("span", null),
          ),
        ),
      ),
      h(
        "div",
        { className: "mobile-nav" },
        h("a", { href: "#" }, "Vehicles"),
        h("a", { href: "#" }, "Energy"),
        h("a", { href: "#" }, "Charging"),
        h("a", { href: "#" }, "Discover"),
        h("a", { href: "#" }, "Shop"),
      ),
    );
  }
}
