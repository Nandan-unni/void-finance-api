import { Express } from "express";
import DocsRouter from "./docs.router";

const Routers = (app: Express) => {
  app.use("/", DocsRouter);
  return app;
};

export default Routers;
