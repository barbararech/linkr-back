import { createPost } from '../repositories/postRepository.js';

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
