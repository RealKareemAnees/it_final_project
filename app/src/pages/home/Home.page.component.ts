import { Component, h, raw } from "../../K-engine";
import type { VNode } from "../../K-engine/types";
import { NavBar } from "../../components/Navbar.component";
import { Footer } from "../../components/Footer.component";
import { SearchBar } from "../../components/SearchBar.component";
import { navigate } from "../../utils/routing.utils";

const localFiles = ["aston-martin.jpg", "audi.avif", "porsche.jpg"];

const quotes = [
  "Luxurious car can you<br>buy from our shop",
  "Performance meets elegance<br>in every curve",
  "Precision engineering<br>for the elite",
  "Drive beyond limits<br>with luxury",
  "Timeless design meets<br>modern innovation",
  "Your dreams deserve<br>the best vehicle",
  "Experience the road<br>like never before",
  "Crafted for those who<br>demand perfection",
];

const slides = localFiles.map((file, index) => ({
  image: `/assets/images/slide-1-images/${file}`,
  quote: quotes[index % quotes.length],
  position: "center 55%",
}));

import type { UserInfo } from "../../types/userInfo.interface";

interface HomePageProps {
  user: UserInfo | null;
}

export class HomePage extends Component<HomePageProps> {
  private currentSlide = 0;
  private carouselReady = false;
  private nextHandler?: () => void;
  private prevHandler?: () => void;
  private keyHandler?: (event: KeyboardEvent) => void;

  componentDidMount(): void {
    document.title = "Car Gallery Landing";
    document.body.classList.remove("auth-page");
    this.initCarousel();
  }

  componentDidUpdate(): void {
    this.initCarousel();
  }

  componentWillUnmount(): void {
    this.teardownCarousel();
  }

  private applySlide(index: number, options: { instant?: boolean } = {}): void {
    const appContainer = document.querySelector<HTMLElement>(".app-container");
    const headline = document.querySelector<HTMLElement>(".hero-headline");
    const currentSlideSpan =
      document.querySelector<HTMLElement>(".current-slide");
    const totalSlideSpan = document.querySelector<HTMLElement>(".total-slides");

    if (!appContainer || !headline || !currentSlideSpan) {
      return;
    }

    const slide = slides[index];
    const newBg = `linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%), url('${slide.image}')`;

    currentSlideSpan.textContent = String(index + 1).padStart(2, "0");
    if (totalSlideSpan) {
      totalSlideSpan.textContent = String(slides.length).padStart(2, "0");
    }

    if (options.instant) {
      appContainer.style.setProperty("--hero-image", newBg);
      appContainer.style.setProperty("--hero-position", slide.position);
      headline.innerHTML = slide.quote;
      headline.classList.remove("fade-out", "fade-in");
      return;
    }

    appContainer.classList.add("is-fading");
    headline.classList.remove("fade-in");
    headline.classList.add("fade-out");

    window.setTimeout(() => {
      appContainer.style.setProperty("--hero-image", newBg);
      appContainer.style.setProperty("--hero-position", slide.position);
      headline.innerHTML = slide.quote;
      headline.classList.remove("fade-out");
      headline.classList.add("fade-in");
      appContainer.classList.remove("is-fading");
    }, 250);
  }

  private goToSlide(index: number): void {
    this.currentSlide = (index + slides.length) % slides.length;
    this.applySlide(this.currentSlide);
  }

  private nextSlide = (): void => {
    this.goToSlide(this.currentSlide + 1);
  };

  private prevSlide = (): void => {
    this.goToSlide(this.currentSlide - 1);
  };

  private initCarousel(): void {
    if (this.carouselReady) return;
    const nextBtn = document.querySelector<HTMLButtonElement>(".nav-btn.next");
    const prevBtn = document.querySelector<HTMLButtonElement>(".nav-btn.prev");

    if (nextBtn && prevBtn) {
      this.nextHandler = this.nextSlide;
      this.prevHandler = this.prevSlide;
      nextBtn.addEventListener("click", this.nextHandler);
      prevBtn.addEventListener("click", this.prevHandler);
    }

    this.keyHandler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        this.nextSlide();
      }
      if (event.key === "ArrowLeft") {
        this.prevSlide();
      }
    };

    document.addEventListener("keydown", this.keyHandler);
    this.carouselReady = true;
    this.applySlide(this.currentSlide, { instant: true });
  }

  private teardownCarousel(): void {
    const nextBtn = document.querySelector<HTMLButtonElement>(".nav-btn.next");
    const prevBtn = document.querySelector<HTMLButtonElement>(".nav-btn.prev");
    if (nextBtn && this.nextHandler) {
      nextBtn.removeEventListener("click", this.nextHandler);
    }
    if (prevBtn && this.prevHandler) {
      prevBtn.removeEventListener("click", this.prevHandler);
    }
    if (this.keyHandler) {
      document.removeEventListener("keydown", this.keyHandler);
    }
    this.carouselReady = false;
  }

  private handleNavigate(event: MouseEvent, path: string): void {
    event.preventDefault();
    navigate(path);
  }

  render(): VNode {
    return h(
      "div",
      { className: "mockup-frame" },
      h(
        "section",
        { className: "app-container", "aria-label": "Hero slideshow" },
        h(
          "div",
          { "data-header-root": "" },
          h(NavBar, { user: this.props.user }),
        ),
        h(
          "main",
          { className: "content" },
          h(
            "div",
            { className: "hero-text-container" },
            h(
              "h1",
              { className: "hero-headline" },
              "Luxurious car can you",
              h("br", null),
              "buy from our shop",
            ),
            h(
              "button",
              { className: "shop-btn", onClick: () => navigate("/browse") },
              "Shop Now ",
              h("span", { className: "arrow-icon" }, raw("&nearr;")),
            ),
          ),
          h("div", { className: "hotspot h1" }),
          h("div", { className: "hotspot h2" }),
          h("div", { className: "hotspot h3" }),
          h(
            "div",
            { className: "bottom-controls" },
            h(
              "button",
              { className: "nav-btn prev", "aria-label": "Previous slide" },
              raw("&larr;"),
            ),
            h(
              "div",
              { className: "right-controls" },
              h(
                "div",
                { className: "page-counter" },
                h("span", { className: "current-slide" }, "01"),
                h("span", { className: "muted" }, "/"),
                h("span", { className: "total-slides" }, "03"),
              ),
              h(
                "button",
                { className: "nav-btn next", "aria-label": "Next slide" },
                raw("&rarr;"),
              ),
            ),
          ),
        ),
      ),
      h(
        "section",
        { className: "thesis", "aria-label": "Website thesis" },
        h(
          "div",
          { className: "thesis-inner" },
          h(
            "div",
            { className: "thesis-text" },
            h("h2", null, "Thesis"),
            h(
              "p",
              null,
              "Bergo is a clean, modern car gallery landing page designed to ",
              "spotlight premium vehicles through a full-screen slideshow. It ",
              "pairs bold typography with simple navigation so users can explore, ",
              "discover, and shop without distractions. The layout is responsive ",
              "by default, keeping the same high-end feel across desktop, tablet, ",
              "and mobile.",
            ),
            h(
              "a",
              {
                href: "/about",
                className: "learn-more-btn",
                "aria-label": "Learn more about Bergo",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/about"),
              },
              "Learn More!",
            ),
          ),
          h(
            "div",
            { className: "thesis-media" },
            h("img", {
              src: "/assets/images/car-tire.jpg",
              alt: "Close-up of a performance car wheel",
              loading: "lazy",
              decoding: "async",
            }),
          ),
        ),
      ),
      h(
        "section",
        { className: "browse-types", "aria-label": "Browse by car type" },
        h(
          "div",
          { className: "browse-inner" },
          h(
            "div",
            { className: "browse-header" },
            h("h2", null, "Browse by Car Type"),
            h(
              "p",
              null,
              "Explore curated categories with a clean, consistent layout.",
            ),
          ),
          h(
            "div",
            { className: "type-grid" },
            h(
              "a",
              {
                className: "type-card",
                href: "/browse?type=Luxury",
                "aria-label": "Browse luxury cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?type=Luxury"),
              },
              h(
                "div",
                { className: "type-thumb" },
                h("img", {
                  src: "/assets/images/car-types/luxury.jpg",
                  alt: "Luxury car type",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h("span", { className: "type-title" }, "Luxury"),
            ),
            h(
              "a",
              {
                className: "type-card",
                href: "/browse?type=Muscle",
                "aria-label": "Browse muscle cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?type=Muscle"),
              },
              h(
                "div",
                { className: "type-thumb" },
                h("img", {
                  src: "/assets/images/car-types/muscle.jpg",
                  alt: "Muscle car type",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h("span", { className: "type-title" }, "Muscle"),
            ),
            h(
              "a",
              {
                className: "type-card",
                href: "/browse?type=Racing",
                "aria-label": "Browse racing cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?type=Racing"),
              },
              h(
                "div",
                { className: "type-thumb" },
                h("img", {
                  src: "/assets/images/car-types/racing.jpg",
                  alt: "Racing car type",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h("span", { className: "type-title" }, "Racing"),
            ),
            h(
              "a",
              {
                className: "type-card",
                href: "/browse?type=Offroad",
                "aria-label": "Browse offroad cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?type=Offroad"),
              },
              h(
                "div",
                { className: "type-thumb" },
                h("img", {
                  src: "/assets/images/car-types/offroader.jpg",
                  alt: "Offroad car type",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h("span", { className: "type-title" }, "Offroad"),
            ),
            h(
              "a",
              {
                className: "type-card",
                href: "/browse?type=Sedan",
                "aria-label": "Browse sedan cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?type=Sedan"),
              },
              h(
                "div",
                { className: "type-thumb" },
                h("img", {
                  src: "/assets/images/car-types/sedan.jpg",
                  alt: "Sedan car type",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h("span", { className: "type-title" }, "Sedan"),
            ),
            h(
              "a",
              {
                className: "type-card",
                href: "/browse?type=SUV",
                "aria-label": "Browse SUV cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?type=SUV"),
              },
              h(
                "div",
                { className: "type-thumb" },
                h("img", {
                  src: "/assets/images/car-types/SUV.jpg",
                  alt: "SUV car type",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h("span", { className: "type-title" }, "SUV"),
            ),
            h(
              "a",
              {
                className: "type-card",
                href: "/browse?type=Sports",
                "aria-label": "Browse sports cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?type=Sports"),
              },
              h(
                "div",
                { className: "type-thumb" },
                h("img", {
                  src: "/assets/images/car-types/sports.jpg",
                  alt: "Sports car type",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h("span", { className: "type-title" }, "Sports"),
            ),
            h(
              "a",
              {
                className: "type-card",
                href: "/browse?type=Roadster",
                "aria-label": "Browse roadster cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?type=Roadster"),
              },
              h(
                "div",
                { className: "type-thumb" },
                h("img", {
                  src: "/assets/images/car-types/roadster.jpg",
                  alt: "Roadster car type",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h("span", { className: "type-title" }, "Roadster"),
            ),
          ),
          h(
            "a",
            {
              href: "/browse",
              className: "more-link",
              "aria-label": "View more car types",
              onClick: (event: MouseEvent) =>
                this.handleNavigate(event, "/browse"),
            },
            h("span", { className: "more-text" }, "and much more"),
            h("span", { className: "more-arrow" }, raw("&rarr;")),
          ),
        ),
      ),
      h(
        "section",
        { className: "browse-countries", "aria-label": "Browse by country" },
        h(
          "div",
          { className: "countries-inner" },
          h(
            "div",
            { className: "countries-header" },
            h("h2", null, "Browse by Country"),
            h(
              "p",
              null,
              "Discover signature styles shaped by roads, culture, and ",
              "engineering traditions.",
            ),
          ),
          h(
            "div",
            { className: "country-grid" },
            h(
              "a",
              {
                className: "country-card",
                href: "/browse?country=USA",
                "aria-label": "Browse American cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?country=USA"),
              },
              h(
                "div",
                { className: "country-image" },
                h("img", {
                  src: "/assets/images/countries/american.jpeg",
                  alt: "American performance coupe at sunset",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h(
                "div",
                { className: "country-body" },
                h("h3", { className: "country-title" }, "American"),
                h(
                  "p",
                  { className: "country-copy" },
                  "Bold silhouettes and long-distance comfort built for open highways.",
                ),
              ),
            ),
            h(
              "a",
              {
                className: "country-card",
                href: "/browse?country=Germany",
                "aria-label": "Browse German cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?country=Germany"),
              },
              h(
                "div",
                { className: "country-image" },
                h("img", {
                  src: "/assets/images/countries/german.avif",
                  alt: "German supercar with classic architecture in the background",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h(
                "div",
                { className: "country-body" },
                h("h3", { className: "country-title" }, "German"),
                h(
                  "p",
                  { className: "country-copy" },
                  "Precision engineering with quiet confidence in every detail.",
                ),
              ),
            ),
            h(
              "a",
              {
                className: "country-card",
                href: "/browse?country=Italy",
                "aria-label": "Browse Italian cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?country=Italy"),
              },
              h(
                "div",
                { className: "country-image" },
                h("img", {
                  src: "/assets/images/countries/italian.jpeg",
                  alt: "Italian sports car in front of a graphic backdrop",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h(
                "div",
                { className: "country-body" },
                h("h3", { className: "country-title" }, "Italian"),
                h(
                  "p",
                  { className: "country-copy" },
                  "Sculpted speed and artistry, where performance meets romance.",
                ),
              ),
            ),
            h(
              "a",
              {
                className: "country-card",
                href: "/browse?country=Japan",
                "aria-label": "Browse Japanese cars",
                onClick: (event: MouseEvent) =>
                  this.handleNavigate(event, "/browse?country=Japan"),
              },
              h(
                "div",
                { className: "country-image" },
                h("img", {
                  src: "/assets/images/countries/japan.jpg",
                  alt: "Japanese performance car with bold graphic art",
                  loading: "lazy",
                  decoding: "async",
                }),
              ),
              h(
                "div",
                { className: "country-body" },
                h("h3", { className: "country-title" }, "Japanese"),
                h(
                  "p",
                  { className: "country-copy" },
                  "Balanced innovation and reliability, crafted with care.",
                ),
              ),
            ),
          ),
        ),
      ),
      h(SearchBar, null),
      h(
        "section",
        { className: "contact-section", "aria-label": "Contact us" },
        h(
          "div",
          { className: "contact-inner" },
          h("div", { className: "contact-eyebrow" }, "Get in touch"),
          h(
            "h2",
            { className: "contact-heading" },
            "We'd love to hear",
            h("br", null),
            "from you.",
          ),
          h(
            "p",
            { className: "contact-sub" },
            raw(
              "Whether you're hunting for a specific model, need expert guidance, or simply want to explore what's possible &mdash; our team is ready.",
            ),
          ),
          h(
            "a",
            {
              href: "/contact",
              className: "contact-cta",
              "aria-label": "Go to contact page",
              onClick: (event: MouseEvent) =>
                this.handleNavigate(event, "/contact"),
            },
            "Contact Us ",
            h("span", { className: "cta-arrow" }, raw("&nearr;")),
          ),
        ),
      ),
      h("div", { "data-footer-root": "" }, h(Footer, null)),
    );
  }
}
