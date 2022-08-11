import { Router } from "express";
import { trending } from "../controllers/hashtagController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidator.js";

const hashtagRouter = Router();

hashtagRouter.get("/trending", tokenValidationMiddleware, trending);

export default hashtagRouter;
