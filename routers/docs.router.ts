import { Router } from "express";
import { IndexController } from "../controllers/docs.controller";
import DocsValidator from "../validators/docs.validator";

const router = Router();

router.get("/", DocsValidator.index, IndexController);

export default router;
