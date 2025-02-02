import { Router } from "express";
import { handler } from "../utils.js";
import {
  createWykladowca,
  getWykladowcy,
  deleteWykladowca,
  joinWykladowcaToKierunek,
  updateWykladowca,
} from "./handlers.js";

export function wykladowcyRouter(dbClient) {
  const router = new Router();

  router.get("/", handler(getWykladowcy(dbClient)));

  router.post("/", handler(createWykladowca(dbClient)));

  router.delete("/:id", handler(deleteWykladowca(dbClient)));

  router.post(
    "/:id/dolacz-do-kierunku",
    handler(joinWykladowcaToKierunek(dbClient)),
  );

  router.put("/:id", handler(updateWykladowca(dbClient)));

  return router;
}
