import express from "express";
import pg from "pg";

async function main() {
  const app = express();
  const port = 3000;

  app.use(express.json());

  const client = new pg.Client({
    database: "mydb",
    user: "kajtu",
    password: "secret123",
  });
  await client.connect();

  //teachers
  app.get("/teachers", async (req, res) => {
    const wykladowcy = await client.query("SELECT * FROM wykladowcy");
    res.json(wykladowcy.rows);
  });

  app.post("/teachers", async (req, res) => {
    const query = `
    INSERT INTO wykladowcy (imie, nazwisko, telefon, email) 
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const { imie, nazwisko, telefon, email } = req.body;
    const values = [imie, nazwisko, telefon, email];
    const wykladowcy = await client.query(query, values);
    res.json(wykladowcy.rows[0]);
  });

  app.delete("/teachers/:id", async (req, res) => {
    const query = `
    DELETE FROM wykladowcy WHERE id_wykladowca = $1 RETURNING *`;
    const id_wykladowca = req.params.id;
    const result = await client.query(query, id_wykladowca);
    res.json(id_wykladowca.rows[0]);
  });

  //mark
  app.get("/mark", async (req, res) => {
    const oceny = await client.query("SELECT * FROM oceny");
    res.json(oceny.rows);
  });

  app.post("/mark", async (req, res) => {
    const query = `
    INSERT INTO oceny (ocena, data_oceny) 
    VALUES ($1, $2) RETURNING *`;
    const { ocena, data_oceny } = req.body;
    const values = [ocena, data_oceny];
    const oceny = await client.query(query, values);
    res.json(oceny.rows[0]);
  });

  // app.delete("/mark/:id", async (req, res) => {
  //   const query = `
  //   DELETE FROM oceny WHERE id_wykladowca = $1`;
  //   const id_wykladowca = req.params.id;
  //   //const result = await client.query(query, id_wykladowca);
  // });

  //kierunek

  app.get("/kierunek", async (req, res) => {
    const kierunek = await client.query("SELECT * FROM kierunek");
    res.json(kierunek.rows);
  });

  app.post("/kierunek", async (req, res) => {
    const query = `
    INSERT INTO kierunek (nazwa_kierunku, poziom_studiow) 
    VALUES ($1, $2) RETURNING *`;
    const { nazwa_kierunku, poziom_studiow } = req.body;
    const values = [nazwa_kierunku, poziom_studiow];
    const kierunek = await client.query(query, values);
    res.json(kierunek.rows[0]);
  });

  //plany
  app.get("/plany", async (req, res) => {
    const plany = await client.query("SELECT * FROM plany_ksztalcenia");
    res.json(plany.rows);
  });

  app.post("/plany", async (req, res) => {
    const query = `
    INSERT INTO plany_ksztalcenia (semestr, rok_akademicki) 
    VALUES ($1, $2) RETURNING *`;
    const { semestr, rok_akademicki } = req.body;
    const values = [semestr, rok_akademicki];
    const plany = await client.query(query, values);
    res.json(plany.rows[0]);
  });

  //subject
  app.get("/subject", async (req, res) => {
    const przedmioty = await client.query("SELECT * FROM przedmioty");
    res.json(przedmioty.rows);
  });

  app.post("/subject", async (req, res) => {
    const query = `
    INSERT INTO przedmioty (nazwa_przedmiotu, liczba_ects) 
    VALUES ($1, $2) RETURNING *`;
    const { nazwa_przedmiotu, liczba_ects } = req.body;
    const values = [nazwa_przedmiotu, liczba_ects];
    const przedmioty = await client.query(query, values);
    res.json(przedmioty.rows[0]);
  });

  //student
  app.get("/student", async (req, res) => {
    const student = await client.query("SELECT * FROM student");
    res.json(student.rows);
  });

  app.post("/student", async (req, res) => {
    const query = `
    INSERT INTO student (imie, nazwisko, pesel, telefon, rok_studiow) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const { imie, nazwisko, pesel, telefon, rok_studiow } = req.body;
    const values = [imie, nazwisko, pesel, telefon, rok_studiow];
    const student = await client.query(query, values);
    res.json(student.rows[0]);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
