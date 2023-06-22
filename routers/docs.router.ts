import { Router } from "express";
import DocsController from "../controllers/docs.controller";
import DocsValidator from "../validators/docs.validator";

const DocsRouter = Router();

DocsRouter.get("/", DocsValidator.index, DocsController.index);

export default DocsRouter;
