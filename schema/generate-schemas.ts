import { writeFile } from "node:fs/promises";

const COUNT = 10000;

const writeTypes = async () => {
  const specifier = process.argv[2];
  let validations = "";
  for (let i = 0; i < COUNT; i++) {
    validations += `const schema${i} = v.optional(v.boolean())\n`;
  }
  await Promise.all([
    writeFile("test.ts", `import * as v from './${specifier}'\n${validations}`),
  ]);
};

writeTypes();
