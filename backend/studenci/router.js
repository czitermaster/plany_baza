import { Router } from "express";
import { handler } from "../utils.js";
import {
  createStudent,
  getStudenci,
  deleteStudent,
  updateStudent,
  joinStudentToPlany,
  getStudent,
} from "./handlers.js";

export function studenciRouter(dbClient) {
  const router = new Router();

  router.get("/", handler(getStudenci(dbClient)));

  router.get("/:id", handler(getStudent(dbClient)));

  router.post("/", handler(createStudent(dbClient)));

  router.delete("/:id", handler(deleteStudent(dbClient)));

  router.put("/:id", handler(updateStudent(dbClient)));

  router.post("/:id/dolacz-do-planu", handler(joinStudentToPlany(dbClient)));

  return router;
}
