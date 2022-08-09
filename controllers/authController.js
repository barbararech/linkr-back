import db from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepositories.js";

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

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const { rows: user } = await userRepository.getUserByEmail(email);

    if (user.length === 0) {
      return res.sendStatus(401);
    }

    const checkPassword = bcrypt.compareSync(password, user[0].password);

    if (!checkPassword) {
      return res.sendStatus(401);
    }

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user[0].id }, secretKey);

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send(error);
  }
}
