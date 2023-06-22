import { Router } from "express";
import UserValidator from "../validators/user.validator";
import UserController from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.post("/", UserValidator.authenticate, UserController.authenticate);

export default UserRouter;
