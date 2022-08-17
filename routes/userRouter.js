import { Router } from "express";
import {
  getUsers,
  getUserPic,
  getUserId,
  getUsersPosts,
  getUserById,
  getUsersBySearch,
  getFollowingUsers,
  FollowUser,
  UnFollowUser,
} from "../controllers/userController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidator.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/pictureUrl", tokenValidationMiddleware, getUserPic);
userRouter.get("/userId", tokenValidationMiddleware, getUserId);
userRouter.get("/user/:id", tokenValidationMiddleware, getUsersPosts);
userRouter.get("/userinfo/:id", tokenValidationMiddleware, getUserById);
userRouter.get("/following/:id", tokenValidationMiddleware, getFollowingUsers);
userRouter.post("/search", getUsersBySearch);
userRouter.post("/follow/:id", tokenValidationMiddleware, FollowUser);
userRouter.delete("/unfollow/:id", tokenValidationMiddleware, UnFollowUser);
export default userRouter;
