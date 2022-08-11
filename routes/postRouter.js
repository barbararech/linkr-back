import { Router } from 'express';
import {
  publishPost,
  likePost,
  dislikePost,
  returnLikes,
  getPosts,
  getPostsHashtag
} from '../controllers/postController.js';
import { tokenValidationMiddleware } from '../middlewares/tokenValidator.js';

const postRouter = Router();

postRouter.post('/post', tokenValidationMiddleware, publishPost);
postRouter.post('/like', tokenValidationMiddleware, likePost);
postRouter.post('/dislike', tokenValidationMiddleware, dislikePost);
postRouter.get('/likes/:postId', tokenValidationMiddleware, returnLikes);
postRouter.get("/timeline", tokenValidationMiddleware, getPosts);
postRouter.get('/hashtag/:hashtag', tokenValidationMiddleware, getPostsHashtag);

export default postRouter;
