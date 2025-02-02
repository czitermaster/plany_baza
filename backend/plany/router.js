import { Router } from "express";
import { handler } from "../utils.js";
import { getPlany, deletePlan, createPlan, updatePlan } from "./handlers.js";

export function planyRouter(dbClient) {
  const router = new Router();

  router.get("/", handler(getPlany(dbClient)));

  router.post("/", handler(createPlan(dbClient)));

  router.delete("/:id", handler(deletePlan(dbClient)));

  router.put("/:id", handler(updatePlan(dbClient)));

  return router;
}
