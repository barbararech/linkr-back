import { userRepository } from '../repositories/userRepositories.js';
import loadMetaDatas from '../repositories/metadataRepository.js';

export async function getUserPosts(req, res) {
  const { id } = req.params;
  try {
    const result = await getPosts(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    for (let i = 0; i < result.rows.length; i++) {
      const infos = await loadMetaDatas(result.rows[i]);
      result.rows[i] = { ...result.rows[i], ...infos };
    }
    res.status(200).send(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).send('Erro de conexão com servidor');
  }
}

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
    res.status(500).send('Erro de conexão com o servidor');
  }
}

export async function getUserId(req, res) {
  try {
    const id = { id: res.locals.id };
    res.status(200).send(id);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro de conexão com o servidor');
  }
}
