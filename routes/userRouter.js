import { Router } from "express";
import { getUsers, getUserPic, getUserId, getUsersPosts, getUserNameById } from "../controllers/userController.js";
import { tokenValidationMiddleware } from '../middlewares/tokenValidator.js';

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/pictureUrl", tokenValidationMiddleware, getUserPic);
userRouter.get("/userId", tokenValidationMiddleware, getUserId);
userRouter.get("/user/:id", tokenValidationMiddleware, getUsersPosts);
userRouter.get("/username/:id", getUserNameById);

export default userRouter;
