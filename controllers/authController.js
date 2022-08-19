import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepositories.js";

export async function signUp(req, res) {
  const { email, password, username, pictureUrl } = req.body;
  const passwordEncrypted = bcrypt.hashSync(password, 10);

  try {
    const { rows: user } = await userRepository.getUserByEmail(email);
    if (user.length !== 0) {
      return res.sendStatus(409);
    }

   const id = await userRepository.addUser(email, passwordEncrypted, username, pictureUrl);
   await userRepository.postFollowUser(id.rows[0].id, id.rows[0].id)
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error);
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
