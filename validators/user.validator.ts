import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { validatorMiddleware } from "../middlewares";

const AuthenticateUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next, {
    bodySchema: Joi.object({
      uid: Joi.string().required().length(28),
      name: Joi.string().required().min(4),
      email: Joi.string().required().email(),
    }),
  });
};

const UserValidator = {
  authenticate: AuthenticateUserValidator,
};

export default UserValidator;
