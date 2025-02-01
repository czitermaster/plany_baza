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
    res.json(kierunek.rows[0]);
  };
}

export function deleteKierunek(dbClient) {
  return async (req, res) => {
    const query = `
    DELETE FROM kierunek WHERE id_kierunek = $1`;
    const id_kierunek = req.params.id;
    await dbClient.query(query, [id_kierunek]);
    res.json({ message: "pomyślnie usunięto kierunek", id: id_kierunek });
  };
}
