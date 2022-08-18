import { Router } from "express";
import {
  getUsers,
  getUserPic,
  getUserId,
  getUsersPosts,
  getUserById,
  getUsersBySearch,
  getFollowingUser,
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

userRouter.post("/search", tokenValidationMiddleware, getUsersBySearch);

userRouter.get("/following/", tokenValidationMiddleware, getFollowingUsers);
userRouter.get("/following/:id", tokenValidationMiddleware, getFollowingUser);
userRouter.post("/follow/:id", tokenValidationMiddleware, FollowUser);
userRouter.delete("/unfollow/:id", tokenValidationMiddleware, UnFollowUser);
export default userRouter;
