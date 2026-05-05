# Project

this project is car wiki website

# Styling guide

## **1. Typography**

The app utilizes a modern, sans-serif typographic system heavily reliant on fluid, responsive sizing.

- **Primary Font Family:** 'Space Grotesk', sans-serif[cite: 4].
- **Font Weights:** Regular (400), Medium (500), and Semibold (600)[cite: 4].
- **Base Sizes:** The scale ranges from `--font-size-xs` (11px) up to `--font-size-4xl` (32px), with standard text defaulting to `--font-size-base` (14px) and `--font-size-md` (15px)[cite: 4].
- **Responsive Headings:** Major headings use CSS `clamp()` to scale fluidly with the viewport, such as the hero text (`clamp(2.2rem, 4.2vw, 4rem)`) and contact headings (`clamp(2.6rem, 5.5vw, 4.2rem)`)[cite: 4].
- **Line Heights:** Configured to be tight for headings (`1.1`) and more relaxed for paragraphs (`1.6` to `1.7`) to ensure readability[cite: 4].

## **2. Color Palette**

The app employs a stark, high-contrast monochrome color scheme with varying levels of transparency for depth.

- **Backgrounds:** Primary dark backgrounds use `#0f0f0f` and `#111` (darker), while light sections use solid white `#fff`[cite: 4].
- **Text Colors:** Dark text is `#111`, light text is `#fff`, and muted text is `#333` or subtle translucent white (`rgba(255, 255, 255, 0.6)`)[cite: 4].
- **Overlays & Shadows:** Black RGB values with alpha channels are used heavily for overlays (ranging from 0.2 to 0.85 opacity) and drop shadows (0.08 to 0.18 opacity)[cite: 4].

## **3. Layout and Spacing**

The spacing system uses a consistent scale and responsive containers to maintain alignment across different screen sizes.

- **Containers:** The standard max-width is `1100px`, with medium (`680px`) and small (`800px`) variants[cite: 4]. All containers maintain a minimum side margin of `24px` (`calc(100% - 48px)`)[cite: 4].
- **Spacing Scale:** Variables range from extra-small (`4px`) up to 8x-large (`80px`)[cite: 4].
- **Section Padding:** Major sections utilize a responsive padding scale, adjusting from `56px` to `130px` depending on the viewport width[cite: 4].
- **Z-Index Hierarchy:** Organized into base levels (`1`), overlays (`2`), header navigation (`50`), and mobile menus (`55`)[cite: 4].

## **4. UI Components**

### **Buttons**

Buttons across the app share unified interactive behaviors.

- **General Behavior:** Hover states universally trigger a slight upward movement (`transform: translateY(-2px)`) and introduce a box shadow[cite: 1, 2, 3, 5]. Clicking (`:active`) returns the button to its original position (`translateY(0)`)[cite: 1, 2, 3, 5].
- **Accessibility:** Keyboard navigation (`:focus-visible`) triggers a distinct `2px` solid outline with a `2px` offset[cite: 1].
- **Styles:** Primary call-to-actions often feature fully rounded corners (`--radius-xl` or `40px`)[cite: 2, 3, 4], while secondary "learn more" links utilize standard borders and background colors[cite: 1].

### **Cards and Grids**

- **Car Types Grid:** Uses a standard CSS grid (`repeat(4, 1fr)` on desktop, scaling down to 2 columns on mobile) with white backgrounds and border-color transitions on hover[cite: 1].
- **Country Browse Cards:** Utilizes a masonry layout (`column-count: 2`)[cite: 6]. These cards feature a dark background, a bottom-up gradient overlay, and a text reveal animation where the copy fades in and translates upward on hover while the background image scales up (`1.05`)[cite: 6].

### **Header & Navigation**

- **Dynamic Header:** The header is fixed to the top (`z-index: 50`) and starts transparent with light text[cite: 3]. When the user scrolls, it adopts a glassmorphism effect (white background at 0.92 opacity with a `10px` backdrop blur) and swaps text to dark[cite: 3].
- **Mobile Nav:** Accessible via a hamburger menu button that animates into view on screens smaller than `900px`[cite: 3]. The mobile menu is a full-width dark overlay (`rgba(0, 0, 0, 0.95)`) that slides down from the top (`translateY(-100%)` to `0`)[cite: 3].

## **5. Animations and Transitions**

- **Easing:** All transitions use a custom cubic-bezier curve (`0.4, 0, 0.2, 1`) to create smooth, natural feeling motion[cite: 4].
- **Speeds:** Transition durations are tiered from fast (`0.18s`) to fade/slow (`0.6s`)[cite: 4]. Hover effects generally use the medium (`0.25s`) or base (`0.2s`) speeds[cite: 1, 3, 4].
- **Keyframes:** The app utilizes predefined animations like `fadeIn` for opacity transitions and `wave` (a horizontal translation looping every `1.2s`) for directional arrows[cite: 1, 4].

# K-engine Quick Guide

## Setup

```ts
import { h, render } from "./index";
import { App } from "./App";

render(h(App, null), document.getElementById("root")!);
```

````

## Elements

```ts id="s0d7zw"
h("div", { className: "box" }, "Hello");

h(
  "button",
  {
    disabled: loading,
    style: { color: "red" },
    onClick: save,
  },
  "Save",
);
```

## Components

Extend `Component<Props, State>` and implement `render()`.

```ts id="k5zjzs"
class Counter extends Component<{}, { count: number }> {
  initState() {
    return { count: 0 };
  }

  render() {
    return h(
      "button",
      {
        onClick: () => this.setState((s) => ({ count: s.count + 1 })),
      },
      this.state.count,
    );
  }
}
```

## State

```ts id="z8m9w3"
this.setState({ loading: true });

this.setState((prev) => ({
  count: prev.count + 1,
}));

this.forceUpdate();
```

## Lifecycle

```ts id="v0g5yq"
componentDidMount();
componentDidUpdate(prevProps, prevState);
componentWillUnmount();
```

## Conditional Rendering

```ts id="nh2k5v"
this.state.error && h("p", null, "Error");

this.state.loading ? h("span", null, "Loading") : h(Content, null);
```

## Lists

Always use `key`.

```ts id="n2r6we"
items.map((item) => h("li", { key: item.id }, item.name));
```

## Props

Pass data/functions through props.

```ts id="q8h3zt"
h(Profile, {
  user: this.state.user,
  onRename: (name) => this.setState({ user: name }),
});
```

## Context

Use `ContextBase` for shared state.

```ts id="y1f8mr"
class ThemeContext extends ContextBase<{}, { dark: boolean }> {
  initState() {
    return { dark: false };
  }
}
```

Methods:

```ts id="q4x7np"
getContext();
setContext();
```

## Raw HTML

Trusted HTML only.

```ts id="e9k2la"
raw("<strong>Hello</strong>");
```

Sanitize user input before using `raw()`.

## API

- `h(type, props, ...children)` → create VNode
- `render(vnode, container)` → mount app
- `raw(html)` → inject HTML
- `Component<P,S>` → base component class
- `ContextBase<P,S>` → shared state helper

```

````
