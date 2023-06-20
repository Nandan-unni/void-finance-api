import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { validatorMiddleware } from "../middlewares";

const IndexValidator = (req: Request, res: Response, next: NextFunction) => {
  return validatorMiddleware(req, res, next, Joi.object({}));
};

const DocsValidator = {
  index: IndexValidator,
};
export default DocsValidator;
