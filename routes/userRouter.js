import { Router } from "express";
import { getUsers, getUserPic, getUserId } from "../controllers/userController.js";
import { tokenValidationMiddleware } from '../middlewares/tokenValidator.js';

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/pictureUrl", tokenValidationMiddleware, getUserPic);
userRouter.get("/userId", tokenValidationMiddleware, getUserId)

export default userRouter;
