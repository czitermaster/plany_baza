import { StatusCodes } from "http-status-codes";
import { PostgresError } from "pg-error-enum";
import pg from "pg";
import { BadRequestError, NotFoundError } from "../utils.js";

export function getWykladowcy(dbClient) {
  return async (req, res) => {
    const wykladowcy = await dbClient.query("SELECT * FROM wykladowcy");
    res.json(wykladowcy.rows);
  };
}

export function createWykladowca(dbClient) {
  return async (req, res) => {
    const query = `
      INSERT INTO wykladowcy (imie, nazwisko, telefon, email) 
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const { imie, nazwisko, telefon, email } = req.body;
    const values = [imie, nazwisko, telefon, email];
    const wykladowcy = await dbClient.query(query, values);
    res.status(StatusCodes.CREATED).json(wykladowcy.rows[0]);
  };
}

export function deleteWykladowca(dbClient) {
  return async (req, res) => {
    const query = `
      DELETE FROM wykladowcy WHERE id_wykladowca = $1`;
    const id_wykladowca = Number(req.params.id);
    const result = await dbClient.query(query, [id_wykladowca]);
    if (result.rowCount === 0) {
      throw new NotFoundError();
    }
    res.json({
      id: id_wykladowca,
    });
  };
}

export function joinWykladowcaToKierunek(dbClient) {
  return async (req, res) => {
    const query = `
    INSERT INTO relationship_3 (id_wykladowca, id_kierunek) VALUES ($1, $2)`;
    const id_wykladowca = Number(req.params.id);
    const { id_kierunek } = req.body;
    const values = [id_wykladowca, id_kierunek];
    try {
      await dbClient.query(query, values);
    } catch (e) {
      if (
        e instanceof pg.DatabaseError &&
        e.code === PostgresError.UNIQUE_VIOLATION
      ) {
        throw new BadRequestError("This relationship already exist");
      }
      if (
        e instanceof pg.DatabaseError &&
        e.code === PostgresError.FOREIGN_KEY_VIOLATION &&
        e.constraint === "fk_relation_relations_wykladow"
      ) {
        throw new NotFoundError("This teacher was not found");
      }

      if (
        e instanceof pg.DatabaseError &&
        e.code === PostgresError.FOREIGN_KEY_VIOLATION &&
        e.constraint === "fk_relation_relations_kierunek"
      ) {
        throw new BadRequestError("This course was not found");
      }
      throw e;
    }

    res.status(StatusCodes.CREATED).json({ id_wykladowca, id_kierunek });
  };
}

export function updateWykladowca(dbClient) {
  return async (req, res) => {
    const { id } = req.params;
    const { imie, nazwisko, telefon, email } = req.body;
    const query = `
      UPDATE wykladowcy
      SET imie = $1, nazwisko = $2, telefon = $3, email = $4
      WHERE id_wykladowca = $5
      RETURNING *`;
    const values = [imie, nazwisko, telefon, email, id];
    const result = await dbClient.query(query, values);
    if (result.rowCount === 0) {
      throw new NotFoundError();
    }
    res.json(result.rows[0]);
  };
}
