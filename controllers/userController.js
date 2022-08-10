import { userRepository } from "../repositories/userRepositories.js";

export async function getUsers(req, res) {
  try {
    const result = await userRepository.getAllUsers();
    res.status(200).send(result.rows);
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function getUserPic(req, res) {
  const id = res.locals.id;
  try {
    const result = await userRepository.getUserPicById(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com o servidor");
  }
}
