import { Router } from "express";
import { handler } from "../utils.js";
import {
  createWykladowca,
  getWykladowcy,
  deleteWykladowca,
} from "./handlers.js";

export function wykladowcyRouter(dbClient) {
  const router = new Router();

  /**
   * @openapi
   * components:
   *   schemas:
   *     CreateWykladowcy:
   *       type: object
   *       properties:
   *         id_wykladowca:
   *           type: integer
   *           example: 8
   *         imie:
   *           type: string
   *           example: "kajtan"
   *         nazwisko:
   *           type: string
   *           example: "kekw"
   *         telefon:
   *           type: string
   *           example: "1232123213"
   *         email:
   *           type: string
   *           example: "xzxzsdsadasxz"
   *
   *     Wykladowcy:
   *       type: object
   *       properties:
   *         id_wykladowca:
   *           type: integer
   *           example: 8
   *         imie:
   *           type: string
   *           example: "kajtan"
   *         nazwisko:
   *           type: string
   *           example: "kekw"
   *         telefon:
   *           type: string
   *           example: "1232123213"
   *         email:
   *           type: string
   *           example: "xzxzsdsadasxz"
   *
   *     WykladowcyResponse:
   *       type: array
   *       items:
   *         $ref: '#/components/schemas/Wykladowcy'
   */
  /**
   * @openapi
   * /wykladowcy:
   *   get:
   *     summary: Pobierz liste wykładowców
   *     responses:
   *       200:
   *         description: Lista wykładowców
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/WykladowcaResponse'
   */

  router.get("/", handler(getWykladowcy(dbClient)));

  /**
   * @openapi
   * /wykladowcy:
   *  post:
   *    description: Stwórz nowego wykładowce
   *    parameters:
   *      - name: wykladowca
   *        in: body
   *        required: true
   *        schema:
   *          $ref: '#/components/schemas/CreateWykladowcy'
   *    responses:
   *      201:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Wykladowcy'
   */

  router.post("/", handler(createWykladowca(dbClient)));

  /**
   * @openapi
   * /wykladowcy/{id_wykladowcy}:
   *   delete:
   *     description: Usuń wykładowce o podanym ID
   *     parameters:
   *       - name: id_wykladowca
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *   responses:
   *     200:
   *       schema:
   *        $ref: '#/components/schemas/Wykladowcy'
   */
  router.delete("/:id", handler(deleteWykladowca(dbClient)));
  return router;
}
