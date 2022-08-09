import { Router } from 'express';
import { publishPost } from '../controllers/postController.js';
import { tokenValidationMiddleware } from '../middlewares/tokenValidator.js';
import { schemaValidator } from '../middlewares/schemaValidator.js';
import linkSchema from '../schemas/linkSchema.js';

const postRouter = Router();

postRouter.post('/post', publishPost);

postRouter.get('/post', (req, res) => {
  res.send('hello world');
});

export default postRouter;
