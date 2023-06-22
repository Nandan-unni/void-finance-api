import { Express } from "express";
import DocsRouter from "./docs.router";
import UserRouter from "./user.router";
import TransactionRouter from "./transaction.router";
import AccountRouter from "./account.router";

const Routers = (app: Express) => {
  app.use("/", DocsRouter);
  app.use("/user", UserRouter);
  app.use("/account", AccountRouter);
  app.use("/transaction", TransactionRouter);
  return app;
};

export default Routers;
