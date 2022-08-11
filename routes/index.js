//Colocar todas as rotas aqui para então seguir para o index

import { Router } from 'express';
import authRouter from './authRouter.js';
import postRouter from './postRouter.js';
import userRouter from './userRouter.js';
import hashtagRouter from './hashtagRouter.js'

const router = Router();
router.use(authRouter);
router.use(postRouter);
router.use(userRouter);
router.use(hashtagRouter);


export default router;
