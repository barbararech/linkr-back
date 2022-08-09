import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { schemas } from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(schemas.signUpSchema), signUp);
authRouter.post("/signin", schemaValidator(schemas.signInSchema), signIn);

export default authRouter;
