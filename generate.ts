import { writeFile } from "node:fs/promises";

const COUNT = 100;

type ComposedType = {
  name: string;
  type: string;
  literal: string;
};

const types: ComposedType[] = [
  { name: "id", type: "number", literal: "0" },
  { name: "title", type: "string", literal: "''" },
  { name: "text", type: "string", literal: "''" },
];

const writeTypes = async () => {
  const resolvedTypes = types.map((type) => {
    return {
      identifier: type.name[0].toUpperCase() + type.name.slice(1),
      ...type,
    };
  });

  let typeAliases = "";
  let interfaces = "";
  let literals = "";
  for (let i = 0; i < COUNT; i++) {
    const outerTypes = resolvedTypes
      .map((type) => {
        return `type ${type.identifier}${i} = { ${type.name}: ${type.type} };`;
      })
      .join("\n");

    const identifiers = resolvedTypes.map((type) => `${type.identifier}${i}`);

    const typeAliasType = identifiers.join(" & ");
    typeAliases += `${outerTypes}\ntype Data${i} = ${typeAliasType};\n`;

    const interfaceType = identifiers.join(", ");
    interfaces += `${outerTypes}\ninterface Data${i} extends ${interfaceType} {}\n`;

    const outerLiterals = resolvedTypes
      .map((type) => {
        return `const ${type.identifier}${i} = { ${type.name}: ${type.literal} }`;
      })
      .join("\n");
    let literalType = "";
    for (const identifier of identifiers) {
      literalType += `...${identifier},`;
    }

    literals += `${outerLiterals}\nconst data${i} = { ${literalType} }\ntype Data${i} = typeof data${i}\n`;
  }

  // so types across files don't collide
  const footer = "export {}";

  await Promise.all([
    writeFile("type-alias.ts", `${typeAliases}${footer}`),
    writeFile("interface.ts", `${interfaces}${footer}`),
    writeFile("literal.ts", `${literals}${footer}`),
  ]);
};

writeTypes();
