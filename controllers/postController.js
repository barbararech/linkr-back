import { createPost } from '../repositories/postRepository.js';
import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata"


export async function publishPost(req, res) {
  //const { link, article } = req.body;
  //const { userId } = res.locals;
    console.log(req.body)
  try {
    const urlInfo = await urlMetadata (req.body.url, {descriptionLength: 200})
    await createPost(req.body.url, req.body.text, res.locals.id, urlInfo.title, urlInfo.description, urlInfo.image);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}


export async function getPosts (req, res){
    try{
        const posts = await postRepository.getPosts()
        const postsArr = []

        if(posts.rowCount === 0){
            res.status(404).send('There are no posts yet')
        }
        res.status(200).send(posts.rows)
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}

