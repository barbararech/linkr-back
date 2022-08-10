import { Router } from 'express';
import { getUserPic } from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/pictureUrl', getUserPic);

export default usersRouter;
