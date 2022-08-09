import { Router } from "express";
import { getPosts } from "../controllers/postController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidator.js";

const postRouter = Router();

postRouter.get("/timeline", tokenValidationMiddleware, getPosts);

export default postRouter;