import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { validatorMiddleware } from "../middlewares";

const GetUserValidator = (req: Request, res: Response, next: NextFunction) => {
  return validatorMiddleware(req, res, next, {});
};

const UserValidator = {
  get: GetUserValidator,
};

export default UserValidator;
