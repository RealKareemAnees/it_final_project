import { Component, h, raw } from "../K-engine";
import type { VNode } from "../K-engine/types";
import { navigate } from "../utils/routing.utils";
import type { UserInfo } from "../types/userInfo.interface";
import { logoutUser, updateThemePreference } from "../utils/auth.utils";
import { switchTheme } from "../utils/theme.utils";

interface NavBarProps {
  user: UserInfo | null;
  isInner?: boolean;
}

export class NavBar extends Component<NavBarProps> {
  private headerEl: HTMLElement | null = null;
  private mobileMenuBtn: HTMLButtonElement | null = null;
  private mobileNav: HTMLElement | null = null;
  private mobileMenuOpen = false;

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
    this.mobileMenuOpen = isActive;
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.setAttribute("aria-expanded", String(isActive));
    }
    this.mobileNav.setAttribute("aria-hidden", String(!isActive));
    this.updateMenuButtonState(isActive);
    document.body.classList.toggle("nav-drawer-open", isActive);
  };

  private handleMobileLinkClick = (): void => {
    this.closeMenu();
  };

  componentDidMount(): void {
    this.initHeader();
  }

  componentDidUpdate(): void {
    this.teardownHeader();
    this.initHeader();
  }

  componentWillUnmount(): void {
    this.teardownHeader();
    document.body.classList.remove("nav-drawer-open");
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
    this.mobileMenuOpen = false;
    this.mobileNav.setAttribute("aria-hidden", "true");
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.setAttribute("aria-expanded", "false");
    }
    document.body.classList.remove("nav-drawer-open");
    this.updateMenuButtonState(false);
  }

  private handleNavClick = (event: MouseEvent, path: string): void => {
    event.preventDefault();
    navigate(path);
  };

  private handleLogout = async (): Promise<void> => {
    await logoutUser();
    navigate("/");
  };

  private handleThemeToggle = async (): Promise<void> => {
    const nextTheme = switchTheme();
    if (this.props.user?.username) {
      await updateThemePreference(nextTheme);
    }
  };

  render(): VNode {
    const { user } = this.props;
    const isAdmin = user?.role === "admin";

    const guestLinks = h(
      "div",
      { className: "nav-actions" },
      h(
        "a",
        {
          href: "/auth",
          className: "nav-link",
          onClick: (event: MouseEvent) => this.handleNavClick(event, "/auth"),
        },
        "Login",
      ),
      h(
        "a",
        {
          href: "/auth",
          className: "nav-link",
          onClick: (event: MouseEvent) => this.handleNavClick(event, "/auth"),
        },
        "Signup",
      ),
    );

    const userLinks = h(
      "div",
      { className: "nav-actions" },
      h(
        "a",
        {
          href: "/profile",
          className: "nav-link",
          onClick: (event: MouseEvent) =>
            this.handleNavClick(event, "/profile"),
        },
        "Profile",
      ),
      isAdmin
        ? h(
            "a",
            {
              href: "/admin",
              className: "nav-link",
              onClick: (event: MouseEvent) =>
                this.handleNavClick(event, "/admin"),
            },
            "Dashboard",
          )
        : null,
      h(
        "button",
        { className: "nav-link nav-button", onClick: this.handleLogout },
        "Logout",
      ),
    );

    return h(
      "div",
      null,
      h(
        "header",
        { className: `header ${this.props.isInner ? "is-inner" : ""}` },
        h(
          "div",
          { className: "logo", onClick: () => navigate("/") },
          "CarWiki",
        ),
        h(
          "nav",
          { className: "desktop-nav" },
          h(
            "a",
            {
              href: "/",
              onClick: (event: MouseEvent) => this.handleNavClick(event, "/"),
            },
            "Home",
          ),
          h(
            "a",
            {
              href: "/about",
              onClick: (event: MouseEvent) =>
                this.handleNavClick(event, "/about"),
            },
            "About",
          ),
          h(
            "a",
            {
              href: "/browse",
              onClick: (event: MouseEvent) =>
                this.handleNavClick(event, "/browse"),
            },
            "Browse",
          ),
          h(
            "a",
            {
              href: "/contact",
              onClick: (event: MouseEvent) =>
                this.handleNavClick(event, "/contact"),
            },
            "Contact",
          ),
        ),
        h(
          "div",
          { className: "header-right" },
          h(
            "button",
            {
              type: "button",
              className: "chat-btn theme-toggle-btn",
              onClick: this.handleThemeToggle,
              "aria-label": "Toggle color theme",
            },
            "Theme",
            h("span", { className: "arrow-icon" }, raw("&nearr;")),
          ),
          user?.username ? userLinks : guestLinks,
          h(
            "button",
            {
              type: "button",
              className: "mobile-menu-btn",
              "aria-label": "Open menu",
              "aria-expanded": "false",
            },
            h("span", null),
            h("span", null),
            h("span", null),
          ),
        ),
      ),
      h(
        "div",
        {
          className: "mobile-nav",
          "aria-hidden": this.mobileMenuOpen ? "false" : "true",
        },
        h(
          "a",
          {
            href: "/",
            onClick: (event: MouseEvent) => this.handleNavClick(event, "/"),
          },
          "Home",
        ),
        h(
          "a",
          {
            href: "/about",
            onClick: (event: MouseEvent) =>
              this.handleNavClick(event, "/about"),
          },
          "About",
        ),
        h(
          "a",
          {
            href: "/browse",
            onClick: (event: MouseEvent) =>
              this.handleNavClick(event, "/browse"),
          },
          "Browse",
        ),
        h(
          "a",
          {
            href: "/contact",
            onClick: (event: MouseEvent) =>
              this.handleNavClick(event, "/contact"),
          },
          "Contact",
        ),

        user?.username
          ? h(
              "a",
              {
                href: "/profile",
                onClick: (event: MouseEvent) =>
                  this.handleNavClick(event, "/profile"),
              },
              "Profile",
            )
          : h(
              "a",
              {
                href: "/auth",
                onClick: (event: MouseEvent) =>
                  this.handleNavClick(event, "/auth"),
              },
              "Login",
            ),
        isAdmin
          ? h(
              "a",
              {
                href: "/admin",
                onClick: (event: MouseEvent) =>
                  this.handleNavClick(event, "/admin"),
              },
              "Dashboard",
            )
          : null,
        user?.username
          ? h(
              "button",
              { className: "nav-link nav-button", onClick: this.handleLogout },
              "Logout",
            )
          : h(
              "a",
              {
                href: "/auth",
                onClick: (event: MouseEvent) =>
                  this.handleNavClick(event, "/auth"),
              },
              "Signup",
            ),
      ),
    );
  }
}
