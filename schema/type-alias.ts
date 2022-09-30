export type BaseNode<TKind extends string> = {
  kind: TKind;
  optional?: boolean;
};

export type AnyBaseNode = BaseNode<any> & { _type: any };

type StringNode = BaseNode<"string"> & { _type: string };
export const string = () => {
  return {
    kind: "string",
  } as StringNode;
};

type OptionalNode<T extends AnyBaseNode> = Omit<T, "optional" | "_type"> & {
  optional: true;
  _type: T["_type"] | undefined;
};

export const optional = <T extends AnyBaseNode>(node: T) => {
  return {
    kind: node.kind,
    optional: true,
  } as OptionalNode<T>;
};

type NumberNode = BaseNode<"number"> & { _type: number };
export const number = () => {
  return {
    kind: "number",
  } as NumberNode;
};

type BooleanNode = BaseNode<"boolean"> & { _type: boolean };
export const boolean = () => {
  return {
    kind: "boolean",
  } as BooleanNode;
};
