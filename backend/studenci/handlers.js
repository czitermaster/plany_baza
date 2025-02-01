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
    const student = await dbClient.query(query, values);
    res.status(201).json(student.rows[0]);
  };
}

export function deleteStudent(dbClient) {
  return async (req, res) => {
    const query = `
  DELETE FROM student WHERE  id_student = $1`;
    const id_student = req.params.id;
    await dbClient.query(query, [id_student]);
    res.json({
      message: "pomyślnie usunięto studetna",
      id: id_student,
    });
  };
}
