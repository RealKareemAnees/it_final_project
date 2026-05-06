export type Props = Record<string, any>;
export type VChild = VNode | string | number;

export interface VNode {
  type: string | (new (props: any) => import("./component").Component);
  props: Props;
  children: VChild[];
  key?: string | number | null;
}
