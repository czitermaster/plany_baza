import express from "express";
import pg from "pg";
import swaggerUi from "swagger-ui-express";
import { studenciRouter } from "./studenci/router.js";
import { planyRouter } from "./plany/router.js";
import { wykladowcyRouter } from "./wykladowcy/router.js";
import { przedmiotyRouter } from "./przedmioty/router.js";
import { kierunkiRouter } from "./kierunki/router.js";
import { errorHanlder } from "./utils.js";
import { getSwaggerUI } from "./swagger.js";

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

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(getSwaggerUI()));

  app.use("/studenci", studenciRouter(client));
  app.use("/wykladowcy", wykladowcyRouter(client));
  app.use("/plany", planyRouter(client));
  app.use("/przedmioty", przedmiotyRouter(client));
  app.use("/kierunki", kierunkiRouter(client));

  app.use((_, res) => {
    res.status(404).json({ message: "Endpoint not found", code: 404 });
  });

  app.use(errorHanlder);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
