import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata";

export async function publishPost(req, res) {
  //const { link, article } = req.body;
  //const { userId } = res.locals;
  console.log(req.body);
  try {
    const urlInfo = await urlMetadata(req.body.url, { descriptionLength: 200 });
    await postRepository.createPost(
      req.body.url,
      req.body.text,
      res.locals.id,
      urlInfo.title,
      urlInfo.description,
      urlInfo.image
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function likePost(req, res) {
  const { postId } = req.params;
  const userId  = res.locals.id;
  console.log(postId)
  console.log(userId)
  try {
    await postRepository.registerLike(postId, userId);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function dislikePost(req, res) {
  const { postId } = req.params;
  const userId  = res.locals.id;

  try {
    await postRepository.removeLike(postId, userId);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function returnLikes(req, res) {
  const { postId } = req.params;
  const userId  = res.locals.id;

  let liked = false;

  try {
    const { userLiked, allLikes } = await postRepository.getLikes(
      postId,
      userId
    );
    const likes = await postRepository.countLikes(postId);
    if (userLiked.rows.length > 0) {
      liked = true;
      allLikes.rows.unshift({ username: "Você" });
    }
    res.json({ likesUsers: allLikes.rows, liked, likes });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await postRepository.getPosts();

    if (posts.rowCount === 0) {
      res.status(404).send("There are no posts yet");
    }
    res.status(200).send(posts.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function editPost(req, res) {
  try {
    const id = res.locals.postId;
    const text = req.body.text;
    await postRepository.editPost(id, text);
    res.status(200).send("atualizado");
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getPostsHashtag(req, res) {
  try {
    const { hashtag } = req.params;
    const posts = await postRepository.getPostsHashtag(hashtag);

    if (posts.rowCount === 0) {
      res.status(404).send("There are no posts yet");
    }
    res.status(200).send(posts.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function deletePost(req, res) {
  try {
    const id = res.locals.postId;
    await postRepository.deletePost(id);
    res.status(204).send("deletado");
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
