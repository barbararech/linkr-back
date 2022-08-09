import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import signUpSchema from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(signUpSchema), signUp);

export default authRouter;