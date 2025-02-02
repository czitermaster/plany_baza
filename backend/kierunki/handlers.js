import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../utils.js";

export function getKierunki(dbClient) {
  return async (req, res) => {
    const kierunek = await dbClient.query("SELECT * FROM kierunek");
    res.json(kierunek.rows);
  };
}

export function createKierunek(dbClient) {
  return async (req, res) => {
    const query = `
        INSERT INTO kierunek (nazwa_kierunku, poziom_studiow) 
        VALUES ($1, $2) RETURNING *`;
    const { nazwa_kierunku, poziom_studiow } = req.body;
    const values = [nazwa_kierunku, poziom_studiow];
    const kierunek = await dbClient.query(query, values);
    res.status(StatusCodes.CREATED).json(kierunek.rows[0]);
  };
}

export function deleteKierunek(dbClient) {
  return async (req, res) => {
    const query = `
    DELETE FROM kierunek WHERE id_kierunek = $1;`;
    const id_kierunek = Number(req.params.id);
    const result = await dbClient.query(query, [id_kierunek]);
    if (result.rowCount === 0) {
      throw new NotFoundError();
    }
    res.json({ id: id_kierunek });
  };
}
export function updateKierunek(dbClient) {
  return async (req, res) => {
    const { id } = req.params;
    const { nazwa_kierunku, poziom_studiow } = req.body;
    const query = `
      UPDATE kierunek
      SET nazwa_kierunku = $1, poziom_studiow = $2
      WHERE id_kierunek = $3
      RETURNING *`;
    const values = [nazwa_kierunku, poziom_studiow, id];
    const result = await dbClient.query(query, values);
    if (result.rowCount === 0) {
      throw new NotFoundError();
    }
    res.json(result.rows[0]);
  };
}
