import { writeFile } from "node:fs/promises";

const COUNT = 100;

type ComposedType = {
  name: string;
  type: string;
};

const types: ComposedType[] = [
  { name: "id", type: "number" },
  { name: "title", type: "string" },
  { name: "text", type: "string" },
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
  for (let i = 0; i < COUNT; i++) {
    const outerTypes = resolvedTypes
      .map((type) => {
        return `export type ${type.identifier}${i} = { ${type.name}: ${type.type} };`;
      })
      .join("\n");

    const identifiers = resolvedTypes.map((type) => `${type.identifier}${i}`);

    const typeAliasType = identifiers.join(" & ");
    const interfaceType = identifiers.join(", ");

    typeAliases += `${outerTypes}\nexport type Data${i} = ${typeAliasType};\n`;
    interfaces += `${outerTypes}\nexport interface Data${i} extends ${interfaceType} {}\n`;
  }
  await Promise.all([
    writeFile("type-alias.ts", typeAliases),
    writeFile("interface.ts", interfaces),
  ]);
};

writeTypes();
