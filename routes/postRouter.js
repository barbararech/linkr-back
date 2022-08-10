import { Router } from 'express';
import { publishPost } from '../controllers/postController.js';
import { tokenValidationMiddleware } from '../middlewares/tokenValidator.js';
import { schemaValidator } from '../middlewares/schemaValidator.js';
import linkSchema from '../schemas/linkSchema.js';
import { getPosts } from "../controllers/postController.js";

const postRouter = Router();

postRouter.post('/post', tokenValidationMiddleware, publishPost);

postRouter.get('/post', (req, res) => {
  res.send('hello world');
});

postRouter.get("/timeline", tokenValidationMiddleware, getPosts);

export default postRouter;
