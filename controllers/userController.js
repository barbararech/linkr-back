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

export async function getUsersPosts(req, res){
  try{
    const id = req.params.id;
    const result = await userRepository.getPostsbyUser(id);
    if(result.rowCount === 0){
      return res.sendStatus(404)
    }
    res.status(200).send(result.rows);
  }catch(e){
    console.error(e);
    res.status(500).send("Erro de conexão com o servidor");
  }
}

export async function getUserNameById(req, res){
  
  try{
    const id = req.params.id
    const username = await userRepository.getUserNameById(id)

    res.status(200).send(username.rows[0])
  }catch(err){
        console.error(err);
    res.status(500).send("Erro de conexão com o servidor");
  }
}

