//Colocar todas as rotas aqui para então seguir para o index

import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(authRouter);
router.use(userRouter)

export default router;
