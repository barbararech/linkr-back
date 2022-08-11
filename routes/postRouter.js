import { Router } from 'express';
import {
  publishPost,
  likePost,
  dislikePost,
  returnLikes,
  getPosts,
  getPostsHashtag,
  editPost
} from '../controllers/postController.js';
import { tokenValidationMiddleware } from '../middlewares/tokenValidator.js';
import { schemaValidator } from '../middlewares/schemaValidator.js';
import postSchema from '../schemas/postSchema.js';
import { validatePostEdit } from '../middlewares/postValidator.js';

const postRouter = Router();

postRouter.post('/post', tokenValidationMiddleware, publishPost);
postRouter.post('/like', tokenValidationMiddleware, likePost);
postRouter.post('/dislike', tokenValidationMiddleware, dislikePost);
postRouter.get('/likes/:postId', tokenValidationMiddleware, returnLikes);
postRouter.get("/timeline", tokenValidationMiddleware, getPosts);
postRouter.get('/hashtag/:hashtag', tokenValidationMiddleware, getPostsHashtag);

postRouter.put('/post/:id',schemaValidator(postSchema),tokenValidationMiddleware, validatePostEdit, editPost)

export default postRouter;
