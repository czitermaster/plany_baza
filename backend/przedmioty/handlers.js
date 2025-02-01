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
    const przedmioty = await dbClient.query(query, values);
    res.json(przedmioty.rows[0]);
  };
}

export function deletePrzedmiot(dbClient) {
  return async (req, res) => {
    const query = `
  DELETE FROM przedmioty WHERE  id_przedmioty = $1`;
    const id_przedmioty = req.params.id;
    await dbClient.query(query, [id_przedmioty]);
    res.json({
      message: "pomyślnie usunięto przedmiot",
      id: id_przedmioty,
    });
  };
}
