import db from "../database/db.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { email, password, username, pictureUrl } = req.body;
  const passwordEncrypted = bcrypt.hashSync(password, 10);

  try {
    const checkUser = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (checkUser.rowCount > 0) {
      return res.status(409).send("Email já cadastrado");
    }

    await db.query(
      `INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4)`,
      [email, passwordEncrypted, username, pictureUrl]
    );
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
}