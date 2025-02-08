import { StatusCodes } from "http-status-codes";
import { PostgresError } from "pg-error-enum";
import pg from "pg";
import { BadRequestError, NotFoundError } from "../utils.js";

export function getPrzedmioty(dbClient) {
  return async (req, res) => {
    const przedmioty = await dbClient.query("SELECT * FROM przedmioty");
    res.json(przedmioty.rows);
  };
}
export function createPrzedmiot(dbClient) {
  return async (req, res) => {
    const query = `
    INSERT INTO przedmioty (nazwa_przedmiotu, liczba_ects, id_plany_ksztalcenia) 
    VALUES ($1, $2, $3) RETURNING *`;
    const { nazwa_przedmiotu, liczba_ects, id_plany_ksztalcenia } = req.body;
    const values = [nazwa_przedmiotu, liczba_ects, id_plany_ksztalcenia];
    try {
      const przedmioty = await dbClient.query(query, values);
      res.status(StatusCodes.CREATED).json(przedmioty.rows[0]);
    } catch (e) {
      if (
        e instanceof pg.DatabaseError &&
        e.code === PostgresError.FOREIGN_KEY_VIOLATION
      ) {
        throw new BadRequestError("Ten plan nie istnieje");
      }
      throw e;
    }
  };
}

export function deletePrzedmiot(dbClient) {
  return async (req, res) => {
    const query = `
  DELETE FROM przedmioty WHERE  id_przedmioty = $1`;
    const id_przedmioty = Number(req.params.id);
    const result = await dbClient.query(query, [id_przedmioty]);
    if (result.rowCount === 0) {
      throw new NotFoundError();
    }
    res.json({
      id: id_przedmioty,
    });
  };
}
export function updatePrzedmioty(dbClient) {
  return async (req, res) => {
    const { id } = req.params;
    const { nazwa_przedmiotu, liczba_ects, id_plany_ksztalcenia } = req.body;
    const query = `
      UPDATE przedmioty
      SET nazwa_przedmiotu=$1, liczba_ects=$2, id_plany_ksztalcenia=$3 
      WHERE id_przedmioty = $4
      RETURNING *`;
    const values = [nazwa_przedmiotu, liczba_ects, id_plany_ksztalcenia, id];
    try {
      const result = await dbClient.query(query, values);
      if (result.rowCount === 0) {
        throw new NotFoundError();
      }
      res.json(result.rows[0]);
    } catch (e) {
      if (
        e instanceof pg.DatabaseError &&
        e.code === PostgresError.FOREIGN_KEY_VIOLATION
      ) {
        throw new BadRequestError("Plan nie istnieje");
      }
      throw e;
    }
  };
}
