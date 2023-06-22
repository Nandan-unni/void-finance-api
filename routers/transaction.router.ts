import { Router } from "express";
import TransactionValidator from "../validators/transaction.validator";
import TransactionController from "../controllers/transaction.controller";

const TransactionRouter = Router();

TransactionRouter.post(
  "/",
  TransactionValidator.create,
  TransactionController.create
);
TransactionRouter.get(
  "/",
  TransactionValidator.list,
  TransactionController.list
);
TransactionRouter.get(
  "/:tid",
  TransactionValidator.get,
  TransactionController.get
);
TransactionRouter.patch(
  "/:tid",
  TransactionValidator.update,
  TransactionController.update
);
TransactionRouter.delete(
  "/:tid",
  TransactionValidator.delete,
  TransactionController.delete
);

export default TransactionRouter;
