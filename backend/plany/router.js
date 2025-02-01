import { Router } from "express";
import { handler } from "../utils.js";
import { getPlany, deletePlan, createPlan } from "./handlers.js";

export function planyRouter(dbClient) {
  const router = new Router();

  /**
   * @openapi
   * components:
   *   schemas:
   *     Plan:
   *       type: object
   *       properties:
   *         id_plany_ksztalcenia:
   *           type: integer
   *           example: 5
   *         id_kierunek:
   *           type: integer
   *           example: 6
   *         semestr:
   *           type: string
   *           example: "4"
   *         rok_akademicki:
   *           type: string
   *           example: "2024/2025"
   *     CreatePlan:
   *       type: object
   *       properties:
   *         id_kierunek:
   *           type: integer
   *           example: 6
   *         semestr:
   *           type: string
   *           example: "4"
   *         rok_akademicki:
   *           type: string
   *           example: "2024/2025"
   */

  /**
   * @openapi
   * /plany:
   *   get:
   *     summary: Pobierz liste planów
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Plan'
   */
  router.get("/", handler(getPlany(dbClient)));

  /**
   * @openapi
   * /plany:
   *  post:
   *    description: Stwórz nowy plan
   *    parameters:
   *      - name: plan
   *        in: body
   *        required: true
   *        schema:
   *          $ref: '#/components/schemas/CreatePlan'
   *    responses:
   *      201:
   *        description:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Plan'
   */
  router.post("/", handler(createPlan(dbClient)));

  /**
   * @openapi
   * /studenci/{id_planu}:
   *   delete:
   *     description: Usuń plan o podanym ID
   *     parameters:
   *       - name: id_planu
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID planu do usinięcia
   *   responses:
   *     200:
   *       description: plan usunięty
   *       schema:
   *         type: object
   *         properties:
   *           message:
   *             type: string
   *             example: "plan usunięty pomyślnie"
   *           id:
   *             type: inteeger
   *             example: 1
   *
   */
  router.delete("/:id", handler(deletePlan(dbClient)));
  return router;
}
