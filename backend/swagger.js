import fs from "fs/promises";
import YAML from "yaml";
import swaggerUI from "swagger-ui-express";

export async function getSwaggerUI() {
  const file = await fs.readFile("swagger-schema.yml", { encoding: "utf-8" });
  const swaggerDoc = YAML.parse(file);
  return swaggerUI.setup(swaggerDoc);
}
