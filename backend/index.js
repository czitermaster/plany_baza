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
    DELETE FROM wykladowcy WHERE id_wykladowca = $1
    `;
    const id_wykladowca = req.params.id;
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
