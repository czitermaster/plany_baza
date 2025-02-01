import { Router } from "express";
import { handler } from "../utils.js";
import { createPrzedmiot, getPrzedmioty, deletePrzedmiot } from "./handlers.js";

export function przedmiotyRouter(dbClient) {
  const router = Router();
  router.get("/", handler(getPrzedmioty(dbClient)));

  router.post("/", handler(createPrzedmiot(dbClient)));

  router.delete("/:id", handler(deletePrzedmiot(dbClient)));

  return router;
}
