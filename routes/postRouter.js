import { Router } from 'express';
import { publishPost, editPost } from '../controllers/postController.js';
import { tokenValidationMiddleware } from '../middlewares/tokenValidator.js';
import { schemaValidator } from '../middlewares/schemaValidator.js';
import linkSchema from '../schemas/linkSchema.js';
import { getPosts } from "../controllers/postController.js";
import postSchema from '../schemas/postSchema.js';
import { validatePostEdit } from '../middlewares/postValidator.js';

const postRouter = Router();

postRouter.post('/post', tokenValidationMiddleware, publishPost);

postRouter.get('/post', (req, res) => {
  res.send('hello world');
});

postRouter.get("/timeline", tokenValidationMiddleware, getPosts);

postRouter.put('/post/:id',schemaValidator(postSchema),tokenValidationMiddleware, validatePostEdit, editPost)

export default postRouter;
