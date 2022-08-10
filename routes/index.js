//Colocar todas as rotas aqui para então seguir para o index

import { Router } from 'express';
import authRouter from './authRouter.js';
import postRouter from './postRouter.js';
import usersRouter from './usersRouter.js';

const router = Router();
router.use(authRouter);
router.use(postRouter);
router.use(usersRouter);

export default router;
