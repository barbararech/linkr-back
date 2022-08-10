import { getUserPicById } from '../repositories/userRepositories.js';

export async function getUserPic(req, res) {
  const id = res.locals.userId;
  try {
    const result = await getUserPicById(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).send('Erro de conexão com o servidor');
  }
}
