//Colocar todas as rotas aqui para então seguir para o index

import { Router } from "express";
import authRouter from "./authRouter.js";

const router = Router();
router.use(authRouter);

export default router;
