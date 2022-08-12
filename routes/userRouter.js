import { Router } from 'express';
import {
  getUsers,
  getUserPic,
  getUserId,
  getUserPosts,
} from '../controllers/userController.js';
import { tokenValidationMiddleware } from '../middlewares/tokenValidator.js';

const userRouter = Router();

userRouter.get('/users', getUsers);
usersRouter.get('/user/:id', tokenValidationMiddleware, getUserPosts);
userRouter.get('/pictureUrl', tokenValidationMiddleware, getUserPic);
userRouter.get('/userId', tokenValidationMiddleware, getUserId);

export default userRouter;
