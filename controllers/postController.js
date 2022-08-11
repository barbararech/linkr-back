import {
  createPost,
  registerLike,
  removeLike,
  getLikes,
  countLikes,
  removePostLikes,
} from '../repositories/postRepository.js';

export async function publishPost(req, res) {
  const { link, article } = req.body;
  const { userId } = res.locals;

  try {
    await createPost(link, article, userId);
    res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
    console.log(error);
  }
}

export async function likePost(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals;

  try {
    await registerLike(postId, userId);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function dislikePost(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals;

  try {
    await removeLike(postId, userId);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function returnLikes(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals;

  let liked = false;

  try {
    const { userLiked, allLikes } = await getLikes(postId, userId);
    const likes = await countLikes(postId);
    if (userLiked.rows.length > 0) {
      liked = true;
      allLikes.rows.unshift({ username: 'Você' });
    }
    res.json({ likesUsers: allLikes.rows, liked, likes });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
