import { Router } from "express";
import { getUsers, getUserPic } from "../controllers/userController.js";
import { tokenValidationMiddleware } from '../middlewares/tokenValidator.js';

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/pictureUrl", tokenValidationMiddleware, getUserPic);

export default userRouter;
