import { createPost } from '../repositories/postRepository.js';
import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata"


export async function publishPost(req, res) {
  const { link, article } = req.body;
  const { userId } = res.locals;

  try {
    await createPost(link, article, userId);
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
            for(let post of posts.rows){
                const teste = await urlMetadata (post.link, {descriptionLength: 50})
                const postInfo = {
                    username: post.username,
                    picture: post.pictureUrl,
                    link: post.link,
                    article: post.article,
                    title: teste.title, 
                    image: teste.image, 
                    description: teste.description
                }
                postsArr.push(postInfo)
            }

        res.status(200).send(postsArr)
    }catch (err){
        console.error(err);
        res.sendStatus(500);
    }
}

