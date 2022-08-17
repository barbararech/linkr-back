import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata";

export async function createComment(req, res) {
  const comment = req.body.comment;
  const { postId } = req.params;
  const userId = res.locals.id;

  try {
    await postRepository.createComment(comment, postId, userId);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function createPost(req, res) {
  const text = req.body.text;
  try {
    const urlInfo = await urlMetadata(req.body.url, { descriptionLength: 200 });

    const postId = await postRepository.createPost(
      req.body.url,
      req.body.text,
      res.locals.id,
      urlInfo.title,
      urlInfo.description,
      urlInfo.image
    );

    if (text.includes("#")) {
      const teste = text.split(" ");
      const hashtags = teste.filter((t) => t[0] === "#");

      for (let i = 0; i < hashtags.length; i++) {
        const word = hashtags[i].replace("#", "");
        const check = await postRepository.getHashtagsByName(word);
        if (check.rowCount === 0) {
          const newHashtag = await postRepository.createHashtag(word);
          console.log(newHashtag);
          await postRepository.createPostHashtags(
            postId.rows[0].id,
            newHashtag.rows[0].id
          );
        }

        if (check.rowCount > 0) {
          await postRepository.createPostHashtags(
            postId.rows[0].id,
            check.rows[0].id
          );
        }
      }
      return res.sendStatus(201);
    }
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function likePost(req, res) {
  const postId = req.params.postId;
  const userId = res.locals.id;
  const action = req.headers.action

  try {
    if(action === "like") {
      await postRepository.registerLike(postId, userId);
      return res.sendStatus(201);
    }

    if(action === "dislike"){
      await postRepository.removeLike(postId, userId);
      return res.sendStatus(201);
    }

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}


export async function getLikes(req, res) {
  const postId = req.params.postId;
  const userId = res.locals.id

  let userLiked = false
  let result = ""
  try {
    const likes  = await postRepository.getLikes(postId);
    let check = likes.rows.find(u => (u.id === userId));
    if(check!== undefined){
      userLiked = true
      const likesWithUser = likes.rows.filter(u=> u.id !== userId);
      check.username = "Você"
      likesWithUser.unshift(check)
      result = {likes:likesWithUser, userLiked:userLiked}
      return res.send(result);
    }
    result = {likes:likes.rows, userLiked:userLiked}
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await postRepository.getPosts();
    return res.status(200).send(posts.rows);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

export async function editPost(req, res) {
  try {
    const id = res.locals.postId;
    const text = req.body.text;

    await postRepository.removePostHashtags(id);
    await postRepository.editPost(id, text);

    if (text.includes("#")) {
      const teste = text.split(" ");
      const hashtags = teste.filter((t) => t[0] === "#");

      for (let i = 0; i < hashtags.length; i++) {
        const word = hashtags[i].replace("#", "");
        const check = await postRepository.getHashtagsByName(word);
        if (check.rowCount === 0) {
          const newHashtag = await postRepository.createHashtag(word);
          console.log(newHashtag);
          await postRepository.createPostHashtags(id, newHashtag.rows[0].id);
        }

        if (check.rowCount > 0) {
          await postRepository.createPostHashtags(id, check.rows[0].id);
        }
      }
    }

    return res.status(200).send("atualizado");
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

export async function getPostsHashtag(req, res) {
  try {
    const { hashtag } = req.params;
    const posts = await postRepository.getPostsHashtag(hashtag);

    if (posts.rowCount === 0) {
      return res.status(404).send("There are no posts yet");
    }
    return res.status(200).send(posts.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

export async function deletePost(req, res) {
  try {
    const id = res.locals.postId;
    const postLikes = res.locals.postLikes;
    const hashtags = res.locals.hashtags;

    if (postLikes > 0) {
      await postRepository.removePostLikes(id);
    }

    if (hashtags > 0) {
      await postRepository.removePostHashtags(id);
    }

    await postRepository.deletePost(id);
    return res.status(204).send("deletado");
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}
