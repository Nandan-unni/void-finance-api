import { Router } from "express";
import AccountValidator from "../validators/account.validator";
import AccountController from "../controllers/account.controller";

const AccountRouter = Router();

AccountRouter.post("/", AccountValidator.create, AccountController.create);
AccountRouter.get("/", AccountValidator.list, AccountController.list);
AccountRouter.get("/:aid", AccountValidator.get, AccountController.get);
AccountRouter.patch("/:aid", AccountValidator.update, AccountController.update);
AccountRouter.delete(
  "/:aid",
  AccountValidator.delete,
  AccountController.delete
);

export default AccountRouter;
