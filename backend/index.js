import express from "express";
import pg from "pg";
import swaggerUi from "swagger-ui-express";
import { studenciRouter } from "./studenci/router.js";
import { planyRouter } from "./plany/router.js";
import { wykladowcyRouter } from "./wykladowcy/router.js";
import { przedmiotyRouter } from "./przedmioty/router.js";
import { kierunkiRouter } from "./kierunki/router.js";
import { errorHandler, handler } from "./utils.js";
import { getSwaggerUI } from "./swagger.js";
import * as OpenApiValidator from "express-openapi-validator";
import cors from "cors";

async function main() {
  const app = express();
  const port = 3000;

  const client = new pg.Client({
    database: "mydb",
    user: "kajtu",
    password: "secret123",
  });
  await client.connect();

  app.use(express.json());

  app.use(cors());

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(getSwaggerUI()));

  app.use(
    OpenApiValidator.middleware({
      validateFormats: true,
      validateRequests: {
        allErrors: true,
      },
      apiSpec: "./swagger-schema.yml",
    }),
  );

  app.use("/studenci", studenciRouter(client));
  app.use("/wykladowcy", wykladowcyRouter(client));
  app.use("/plany", planyRouter(client));
  app.use("/przedmioty", przedmiotyRouter(client));
  app.use("/kierunki", kierunkiRouter(client));

  app.get(
    "/health",
    handler((req, res) => {
      res.status(200).json({ message: "OK" });
    }),
  );

  app.use(
    handler((_, res) => {
      console.log("Endpoint not found");
      throw new NotFoundError("Not Found");
      // res.status(404).json({ message: "Endpoint not found", code: 404 });
    }),
  );

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
