import { postRepository } from "../repositories/postRepository.js";

export async function validatePostEdit(req, res, next){
    const userId= res.locals.id;
    const id = req.params.id;
    console.log(userId)
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