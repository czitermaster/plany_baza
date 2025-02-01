import express from "express";
import pg from "pg";

function handler(func) {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      console.log("Caught in handler");
      console.log("error", err);
      next(err);
    }
  };
}

function errorHanlder(err, req, res, next) {
  console.log("Application Error");
  console.log("error message: ", err.message);
  console.log(err.stack);
  res.status(500).json({ message: "Internal Server Error", code: 500 });
}

async function main() {
  const app = express();
  const port = 3000;

  const client = new pg.Client({
    database: "mydb",
    user: "kajtu",
    password: "secret123",
  });
  await client.connect();

  app.use(express.json());

  // wyklad
  app.get(
    "/wykladowcy",
    handler(async (req, res) => {
      const wykladowcy = await client.query("SELECT * FROM wykladowcy");
      res.json(wykladowcy.rows);
    }),
  );

  app.post(
    "/wykladowcy",
    handler(async (req, res) => {
      const query = `
    INSERT INTO wykladowcy (imie, nazwisko, telefon, email) 
    VALUES ($1, $2, $3, $4) RETURNING *`;
      const { imie, nazwisko, telefon, email } = req.body;
      const values = [imie, nazwisko, telefon, email];
      const wykladowcy = await client.query(query, values);
      res.json(wykladowcy.rows[0]);
    }),
  );

  app.delete(
    "/wykladowcy/:id",
    handler(async (req, res) => {
      const query = `
    DELETE FROM wykladowcy WHERE id_wykladowca = $1`;
      const id_wykladowca = req.params.id;
      await client.query(query, [id_wykladowca]);
      res.json({
        message: "pomyślnie usunięto wygkładowce",
        id: id_wykladowca,
      });
    }),
  );

  //mark
  // app.get("/mark", async (req, res) => {
  //   const oceny = await client.query("SELECT * FROM oceny");
  //   res.json(oceny.rows);
  // });

  // app.post("/mark", async (req, res) => {
  //   const query = `
  //   INSERT INTO oceny (ocena, data_oceny)
  //   VALUES ($1, $2) RETURNING *`;
  //   const { ocena, data_oceny } = req.body;
  //   const values = [ocena, data_oceny];
  //   const oceny = await client.query(query, values);
  //   res.json(oceny.rows[0]);
  // });

  //kierunek

  app.get(
    "/kierunki",
    handler(async (req, res) => {
      const kierunek = await client.query("SELECT * FROM kierunek");
      res.json(kierunek.rows);
    }),
  );

  app.post(
    "/kierunki",
    handler(async (req, res) => {
      const query = `
        INSERT INTO kierunek (nazwa_kierunku, poziom_studiow) 
        VALUES ($1, $2) RETURNING *`;
      const { nazwa_kierunku, poziom_studiow } = req.body;
      const values = [nazwa_kierunku, poziom_studiow];
      const kierunek = await client.query(query, values);
      res.json(kierunek.rows[0]);
    }),
  );

  app.delete(
    "/kierunki/:id",
    handler(async (req, res) => {
      const query = `
    DELETE FROM kierunek WHERE id_kierunek = $1`;
      const id_kierunek = req.params.id;
      await client.query(query, [id_kierunek]);
      res.json({ message: "pomyślnie usunięto kierunek", id: id_kierunek });
    }),
  );

  //plany
  app.get(
    "/plany",
    handler(async (req, res) => {
      const plany = await client.query("SELECT * FROM plany_ksztalcenia");
      res.json(plany.rows);
    }),
  );

  app.post(
    "/plany",
    handler(async (req, res) => {
      const query = `
    INSERT INTO plany_ksztalcenia (semestr, rok_akademicki, id_kierunek) 
    VALUES ($1, $2, $3) RETURNING *`;
      const { semestr, rok_akademicki, id_kierunek } = req.body;
      const values = [semestr, rok_akademicki, id_kierunek];
      const plany = await client.query(query, values);
      res.json(plany.rows[0]);
    }),
  );

  app.delete(
    "/plany/:id",
    handler(async (req, res) => {
      const query = `
    DELETE FROM plany_ksztalcenia WHERE id_plany = $1`;
      const plany_ksztalcenia = req.params.id;
      await client.query(query, [plany_ksztalcenia]);
      res.json({
        message: "romyślnie usunięto plan",
        id: plany_ksztalcenia,
      });
    }),
  );

  //przedmioty
  app.get(
    "/przedmioty",
    handler(async (req, res) => {
      const przedmioty = await client.query("SELECT * FROM przedmioty");
      res.json(przedmioty.rows);
    }),
  );

  app.post(
    "/przedmioty",
    handler(async (req, res) => {
      const query = `
    INSERT INTO przedmioty (nazwa_przedmiotu, liczba_ects, id_plany_ksztalcenia) 
    VALUES ($1, $2, $3) RETURNING *`;
      const { nazwa_przedmiotu, liczba_ects, id_plany_ksztalcenia } = req.body;
      const values = [nazwa_przedmiotu, liczba_ects, id_plany_ksztalcenia];
      const przedmioty = await client.query(query, values);
      res.json(przedmioty.rows[0]);
    }),
  );

  app.delete(
    "/przedmioty/:id",
    handler(async (req, res) => {
      const query = `
    DELETE FROM przedmioty WHERE  id_przedmioty = $1`;
      const id_przedmioty = req.params.id;
      await client.query(query, [id_przedmioty]);
      res.json({
        message: "pomyślnie usunięto przedmiot",
        id: id_przedmioty,
      });
    }),
  );

  //studenci
  app.get(
    "/studenci",
    handler(async (req, res) => {
      const student = await client.query("SELECT * FROM student");
      res.json(student.rows);
    }),
  );

  app.post(
    "/studenci",
    handler(async (req, res) => {
      const query = `
    INSERT INTO student (imie, nazwisko, pesel, telefon, rok_studiow, id_kierunek) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const { imie, nazwisko, pesel, telefon, rok_studiow, id_kierunek } =
        req.body;
      const values = [imie, nazwisko, pesel, telefon, rok_studiow, id_kierunek];
      const student = await client.query(query, values);
      res.json(student.rows[0]);
    }),
  );

  app.delete(
    "/studenci/:id",
    handler(async (req, res) => {
      const query = `
    DELETE FROM student WHERE  id_student = $1`;
      const id_student = req.params.id;
      await client.query(query, [id_student]);
      res.json({
        message: "pomyślnie usunięto studetna",
        id: id_student,
      });
    }),
  );

  app.use(() => {
    res.status(404).json({ message: "Endpoint not found", code: 404 });
  });

  app.use(errorHanlder);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
