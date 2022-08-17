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

export async function getUsersPosts(req, res) {
  try {
    const id = req.params.id;
    const result = await userRepository.getPostsbyUser(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    res.status(200).send(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro de conexão com o servidor");
  }
}

export async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await userRepository.getUserById(id);

    res.status(200).send(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro de conexão com o servidor");
  }
}

export async function getUsersBySearch(req, res) {
  const username = req.body.username;
  try {
    const result = await userRepository.getUsersBySearch(username);
    return res.status(200).send(result.rows);
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function getFollowingUsers(req, res) {
  try {
    const userId = res.locals.id;
    const followingUserId = req.params.id;
    const result = await userRepository.getFollowingUser(
      userId,
      followingUserId
    );
    return res.status(200).send(result.rows);
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
}

export async function FollowUser(req, res) {
  try {
    const userId = res.locals.id;
    const followingUserId = req.params.id;
    await userRepository.FollowUser(userId, followingUserId);

    return res.status(200);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Erro de conexão com o servidor");
  }
}

export async function UnFollowUser(req, res) {
  try {
    const userId = res.locals.id;
    const followingUserId = req.params.id;
    await userRepository.UnfollowUser(userId, followingUserId);

    return res.status(200);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Erro de conexão com o servidor");
  }
}
