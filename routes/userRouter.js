import { Router } from "express";
import { getUsers, getUserPic } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/pictureUrl", getUserPic);

export default userRouter;
