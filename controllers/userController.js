import { userRepository } from "../repositories/userRepositories.js";

export async function getUsers(req, res) {
  try {
    const result = await userRepository.getAllUsers();
    return res.status(200).send(result.rows);
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function getUserPic(req, res) {
  const id = res.locals.id;
  try {
    const result = await userRepository.getUserPicById(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    return res.status(200).send(result.rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Erro de conexão com o servidor");
  }
}

export async function getUserId(req, res) {
  try {
    const id = { id: res.locals.id };
    return res.status(200).send(id);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Erro de conexão com o servidor");
  }
}
