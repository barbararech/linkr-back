import { Router } from 'express';
import {
  createPost,
  likePost,
  getLikes,
  getPosts,
  getPostsHashtag,
  editPost,
  deletePost,
  createComment
} from '../controllers/postController.js';
import { tokenValidationMiddleware } from '../middlewares/tokenValidator.js';
import { schemaValidator } from '../middlewares/schemaValidator.js';
import {postSchema, createPostSchema, commentSchema} from '../schemas/postSchema.js';
import { validatePostDeletion, validatePostEdit } from '../middlewares/postValidator.js';

const postRouter = Router();

postRouter.post('/post', tokenValidationMiddleware, schemaValidator(createPostSchema),createPost);
postRouter.post('/like/:postId', tokenValidationMiddleware, likePost);

postRouter.get('/likes/:postId', tokenValidationMiddleware, getLikes);
postRouter.get("/timeline", tokenValidationMiddleware, getPosts);
postRouter.get('/hashtag/:hashtag', tokenValidationMiddleware, getPostsHashtag);

postRouter.put('/post/:id',schemaValidator(postSchema),tokenValidationMiddleware, validatePostEdit, editPost);

postRouter.delete('/post/:id', tokenValidationMiddleware, validatePostDeletion, deletePost);

postRouter.post('/comment/:postId', tokenValidationMiddleware, schemaValidator(commentSchema) ,createComment);

export default postRouter;
