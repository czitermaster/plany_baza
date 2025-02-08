import { StatusCodes } from "http-status-codes";
import { PostgresError } from "pg-error-enum";
import pg from "pg";
import { BadRequestError, NotFoundError } from "../utils.js";

export function getStudenci(dbClient) {
  return async (req, res) => {
    const student = await dbClient.query("SELECT * FROM student");
    res.json(student.rows);
  };
}

export function createStudent(dbClient) {
  return async (req, res) => {
    const query = `
      INSERT INTO student (imie, nazwisko, pesel, telefon, rok_studiow, id_kierunek) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const { imie, nazwisko, pesel, telefon, rok_studiow, id_kierunek } =
      req.body;
    const values = [imie, nazwisko, pesel, telefon, rok_studiow, id_kierunek];
    try {
      const student = await dbClient.query(query, values);
      res.status(StatusCodes.CREATED).json(student.rows[0]);
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

export function deleteStudent(dbClient) {
  return async (req, res) => {
    const query = `
  DELETE FROM student WHERE  id_student = $1`;
    const id_student = Number(req.params.id);
    const result = await dbClient.query(query, [id_student]);
    if (result.rowCount === 0) {
      throw new NotFoundError();
    }
    res.json({
      id: id_student,
    });
  };
}

export function updateStudent(dbClient) {
  return async (req, res) => {
    const { id } = req.params;
    const { imie, nazwisko, pesel, telefon, rok_studiow, id_kierunek } =
      req.body;
    const query = `
      UPDATE student
      SET imie=$1, nazwisko=$2, pesel=$3, telefon=$4, rok_studiow=$5, id_kierunek=$6
      WHERE id_student = $7
      RETURNING *`;
    const values = [
      imie,
      nazwisko,
      pesel,
      telefon,
      rok_studiow,
      id_kierunek,
      id,
    ];

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
        throw new BadRequestError("Ten kierunek nie istnieje");
      }
      throw e;
    }
  };
}

export function joinStudentToPlany(dbClient) {
  return async (req, res) => {
    const query = `
    INSERT INTO relationship_2 (id_student, id_plany_ksztalcenia) VALUES ($1, $2)`;
    const id_student = Number(req.params.id);
    const { id_plany_ksztalcenia } = req.body;
    const values = [id_student, id_plany_ksztalcenia];
    try {
      await dbClient.query(query, values);
      res
        .status(StatusCodes.CREATED)
        .json({ id_student, id_plany_ksztalcenia });
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
        e.constraint === "fk_relation_relations_student"
      ) {
        throw new NotFoundError("This student was not found");
      }

      if (
        e instanceof pg.DatabaseError &&
        e.code === PostgresError.FOREIGN_KEY_VIOLATION &&
        e.constraint === "fk_relation_relations_plany_ks"
      ) {
        throw new BadRequestError("This plany were not found");
      }
      throw e;
    }
  };
}
