import { postRepository } from "../repositories/postRepository.js";

export async function validatePostEdit(req, res, next){
    const userId= res.locals.id;
    const id = req.params.id;
    const post = await postRepository.getPostById(id);
    

    if (post.rowCount ===0){
        res.status(404).send('post não existe')
        return
    }

    if (post.rows[0].userId !== userId){
        res.status(401).send('usuário nao é o dono do post')
        return
    }

    res.locals.postId= id
    next()
}

export async function validatePostDeletion(req, res, next){
    const userId =res.locals.id
    const id = req.params.id;
    const post = await postRepository.getPostById(id);

    if (post.rowCount ===0){
        res.status(404).send('post não existe')
        return
    }
    if (post.rows[0].userId !== userId){
        res.status(401).send('usuário nao é o dono do post')
        return
    }

    if(post.rows[0].postLikes > 0){
        const postLikes = post.rows[0].postLikes
        res.locals.postLikes = postLikes
    }

    if(post.rows[0].hashtags > 0){
        const hashtags = post.rows[0].hashtags
        res.locals.hashtags = hashtags
    }

    res.locals.postId= id
    next()
}