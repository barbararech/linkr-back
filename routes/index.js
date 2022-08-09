//Colocar todas as rotas aqui para então seguir para o index

import { Router } from "express";
import authRouter from "./authRouter.js";
import hashtagRouter from "./hashtagRouter.js";

const router = Router();
router.use(authRouter);
router.use(hashtagRouter);

export default router;
