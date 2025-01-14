import express from 'express';
import mysql2 from 'mysql2/promise';

async function main() {
  const conn = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "secret123",
    database: "mydb",
  });

  console.log(conn)
  const app = express()
  const port = 3000

  app.get('/', async (req, res) => {
    const users = await conn.query('SELECT user FROM mysql.user;');
    console.log(users);
    res.json({ users });
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()