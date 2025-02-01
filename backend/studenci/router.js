import express from "express";
import { handler } from "../utils.js";
import { createStudent, getStudenci, deleteStudent } from "./handlers.js";

export function studenciRouter(dbClient) {
  const router = new express.Router();

  /**
   * @openapi
   * components:
   *   schemas:
   *     CreateStudent:
   *       type: object
   *       properties:
   *         id_kierunek:
   *           type: integer
   *           example: 6
   *         imie:
   *           type: string
   *           example: "Kajetan"
   *         nazwisko:
   *           type: string
   *           example: "Kacprzyk"
   *         pesel:
   *           type: string
   *           example: "21372137420"
   *         telefon:
   *           type: string
   *           example: "123456789"
   *         rok_studiow:
   *           type: integer
   *           example: 5
   *
   *     Student:
   *       type: object
   *       properties:
   *         id_student:
   *           type: integer
   *           example: 3
   *         id_kierunek:
   *           type: integer
   *           example: 6
   *         imie:
   *           type: string
   *           example: "Kajetan"
   *         nazwisko:
   *           type: string
   *           example: "Kacprzyk"
   *         pesel:
   *           type: string
   *           example: "21372137420"
   *         telefon:
   *           type: string
   *           example: "123456789"
   *         rok_studiow:
   *           type: integer
   *           example: 5
   *
   *     StudentsResponse:
   *       type: array
   *       items:
   *         $ref: '#/components/schemas/Student'
   */

  /**
   * @openapi
   * /studenci:
   *   get:
   *     summary: Pobierz liste studentów
   *     responses:
   *       200:
   *         description: Lista studentów
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/StudentsResponse'
   */
  router.get("/", handler(getStudenci(dbClient)));

  /**
   * @openapi
   * /studenci:
   *  post:
   *    description: Stwórz nowego studenta
   *    parameters:
   *      - name: student
   *        in: body
   *        required: true
   *        schema:
   *          $ref: '#/components/schemas/CreateStudent'
   *    responses:
   *      201:
   *        description:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Student'
   */
  router.post("/", handler(createStudent(dbClient)));

  /**
   * @openapi
   * /studenci/{id_studenta}:
   *   delete:
   *     summary: Usuń studenta o podanym ID
   *     parameters:
   *       - name: id_studenta
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the student to retrieve:w
   *   responses:
   *     200:
   *       description: student usunięty
   *       schema:
   *        $ref: '#/components/schemas/Student'
   *
   *
   */
  router.delete("/:id", handler(deleteStudent(dbClient)));
  return router;
}
