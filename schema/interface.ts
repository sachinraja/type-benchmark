export interface BaseNode<TKind extends string> {
  kind: TKind;
  optional?: boolean;
}

export interface AnyBaseNode extends BaseNode<any> {
  _type: any;
}

interface StringNode extends BaseNode<"string"> {
  _type: string;
}

export const string = () => {
  return {
    kind: "string",
  } as StringNode;
};

interface OptionalNode<T extends AnyBaseNode> {
  kind: T["kind"];
  optional: true;
  _type: T["_type"] | undefined;
}

export const optional = <T extends AnyBaseNode>(node: T) => {
  return {
    kind: node.kind,
    optional: true,
  } as OptionalNode<T>;
};

interface NumberNode extends BaseNode<"number"> {
  _type: number;
}
export const number = () => {
  return {
    kind: "number",
  } as NumberNode;
};

interface BooleanNode extends BaseNode<"boolean"> {
  _type: boolean;
}
export const boolean = () => {
  return {
    kind: "boolean",
  } as BooleanNode;
};
