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
    res.json(wykladowcy.rows[0]);
  };
}
export function deleteWykladowca(dbClient) {
  return async (req, res) => {
    const query = `
  DELETE FROM wykladowcy WHERE id_wykladowca = $1`;
    const id_wykladowca = req.params.id;
    await dbClient.query(query, [id_wykladowca]);
    res.json({
      message: "pomyślnie usunięto wygkładowce",
      id: id_wykladowca,
    });
  };
}
