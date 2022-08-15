import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata";

export async function publishPost(req, res) {
  const text = req.body.text
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

    if(text.includes('#')){
      const teste = text.split(' ')
      const hashtags = teste.filter((t)=> t[0]==="#")
      
      for(let i =0; i< hashtags.length; i++ ){
        const word = hashtags[i].replace('#','')
        const check = await postRepository.getHashtagsByName(word)
        if( check.rowCount === 0){
          const newHashtag = await postRepository.createHashtag(word)
          console.log(newHashtag) 
          await postRepository.createPostHashtags(postId.rows[0].id, newHashtag.rows[0].id)
        }

        if (check.rowCount > 0){
          await postRepository.createPostHashtags(postId.rows[0].id, check.rows[0].id)
        }
      }
    }
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function likePost(req, res) {
  const { postId } = req.params;
  const userId = res.locals.id;
  try {
    await postRepository.registerLike(postId, userId);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function dislikePost(req, res) {
  const { postId } = req.params;
  const userId = res.locals.id;

  try {
    await postRepository.removeLike(postId, userId);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function returnLikes(req, res) {
  const { postId } = req.params;
  const userId = res.locals.id;

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
    return res.json({ likesUsers: allLikes.rows, liked, likes });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getPosts(req, res) {
  try {
    const posts = await postRepository.getPosts();

    if (posts.rowCount === 0) {
      res.status(404).send("There are no posts yet");
    }
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

    await postRepository.removePostHashtags(id)
    await postRepository.editPost(id, text);

    if(text.includes('#')){
      const teste = text.split(' ')
      const hashtags = teste.filter((t)=> t[0]==="#")
      
      for(let i =0; i< hashtags.length; i++ ){
        const word = hashtags[i].replace('#','')
        const check = await postRepository.getHashtagsByName(word)
        if( check.rowCount === 0){
          const newHashtag = await postRepository.createHashtag(word)
          console.log(newHashtag) 
          await postRepository.createPostHashtags(id, newHashtag.rows[0].id)
        }

        if (check.rowCount > 0){
          await postRepository.createPostHashtags(id, check.rows[0].id)
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

    if(postLikes > 0){
    await postRepository.removePostLikes(id)
    }

    if(hashtags > 0){
    await postRepository.removePostHashtags(id)
    }
    
    await postRepository.deletePost(id);
    return res.status(204).send("deletado");
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}
