// ============================================================
//  MiniAct – Types
//  Shared type definitions for the entire framework
// ============================================================

/** Generic props object – any key/value pairs */
export type Props = Record<string, any>;

/** A child can be a VNode, a plain string, or a number */
export type VChild = VNode | string | number;

/**
 * Virtual DOM node – a lightweight description of what
 * should appear in the real DOM.
 */
export interface VNode {
  /** String tag ("div", "span") OR a Component class */
  type: string | ComponentConstructor;
  /** Attributes, event handlers, className, style, etc. */
  props: Props;
  /** Nested children */
  children: VChild[];
  /** Optional key for list reconciliation */
  key?: string | number | null;
}

/**
 * Any class that can be `new`-ed with props and returns a Component.
 * Using `any` here intentionally — TypeScript's generic variance rules
 * make a strict version very painful when composing typed components.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentConstructor = new (props: any) => import("./component").Component<any, any>;
