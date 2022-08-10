import db from "../database/db.js";

export async function getUsers(req, res) {
    try {
      const result =
        await db.query(`SELECT * FROM users`);
      res.status(200).send(result.rows);
    } catch (e) {
      res.sendStatus(500);
    }
}