import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../utils.js";
import { PostgresError } from "pg-error-enum";
import pg from "pg";

export function getPlany(dbClient) {
  return async (req, res) => {
    const plany = await dbClient.query("SELECT * FROM plany_ksztalcenia");
    res.json(plany.rows);
  };
}

export function createPlan(dbClient) {
  return async (req, res) => {
    const query = `
    INSERT INTO plany_ksztalcenia (semestr, rok_akademicki, id_kierunek) 
    VALUES ($1, $2, $3) RETURNING *`;
    const { semestr, rok_akademicki, id_kierunek } = req.body;
    const values = [semestr, rok_akademicki, id_kierunek];
    try {
      const plany = await dbClient.query(query, values);
      res.status(StatusCodes.CREATED).json(plany.rows[0]);
    } catch (e) {
      if (
        e instanceof pg.DatabaseError &&
        e.code === PostgresError.FOREIGN_KEY_VIOLATION
      ) {
        throw new BadRequestError("Kierunek nie istnieje");
      }
      throw e;
    }
  };
}

export function deletePlan(dbClient) {
  return async (req, res) => {
    const query = `
    DELETE FROM plany_ksztalcenia WHERE id_plany_ksztalcenia = $1`;
    const plany_ksztalcenia = Number(req.params.id);
    const result = await dbClient.query(query, [plany_ksztalcenia]);
    if (result.rowCount === 0) {
      throw new NotFoundError();
    }
    res.json({
      id: plany_ksztalcenia,
    });
  };
}

export function updatePlan(dbClient) {
  return async (req, res) => {
    const { id } = req.params;
    const { semestr, rok_akademicki, id_kierunek } = req.body;
    const query = `
      UPDATE plany_ksztalcenia
      SET semestr = $1, rok_akademicki = $2, id_kierunek = $3
      WHERE id_plany_ksztalcenia = $4
      RETURNING *`;
    const values = [semestr, rok_akademicki, id_kierunek, id];
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
        throw new BadRequestError("Kierunek nie istnieje");
      }
      throw e;
    }
  };
}
