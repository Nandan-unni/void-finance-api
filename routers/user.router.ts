import { Router } from "express";
import UserValidator from "../validators/user.validator";
import UserController from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get("/", UserValidator.get, UserController.get);

export default UserRouter;
