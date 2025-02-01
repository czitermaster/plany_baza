import { Router } from "express";
import { handler } from "../utils.js";
import { createKierunek, deleteKierunek, getKierunki } from "./handlers.js";

export function kierunkiRouter(dbClient) {
  const router = new Router();
  router.get("/", handler(getKierunki(dbClient)));

  router.post("/", handler(createKierunek(dbClient)));

  router.delete("/:id", handler(deleteKierunek(dbClient)));
  return router;
}
