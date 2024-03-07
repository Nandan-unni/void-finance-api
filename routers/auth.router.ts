import { Router } from "express";
import AuthValidator from "../validators/auth.validator";
import AuthController from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/sign-up", AuthValidator.signup, AuthController.signup);
AuthRouter.post("/sign-in", AuthValidator.signin, AuthController.signin);
AuthRouter.get(
  "/username-availability",
  AuthValidator.usernameAvailability,
  AuthController.usernameAvailability
);

export default AuthRouter;
