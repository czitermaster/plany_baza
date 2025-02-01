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
    const plany = await dbClient.query(query, values);
    res.status(201).json(plany.rows[0]);
  };
}
export function deletePlan(dbClient) {
  return async (req, res) => {
    const query = `
    DELETE FROM plany_ksztalcenia WHERE id_plany = $1`;
    const plany_ksztalcenia = req.params.id;
    await dbClient.query(query, [plany_ksztalcenia]);
    res.json({
      message: "pomyślnie usunięto plan",
      id: plany_ksztalcenia,
    });
  };
}
