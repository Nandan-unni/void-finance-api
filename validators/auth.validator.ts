import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { validatorMiddleware } from "../middlewares";

const SignupValidator = (req: Request, res: Response, next: NextFunction) => {
  return validatorMiddleware(req, res, next, {
    bodySchema: Joi.object({
      username: Joi.string().required().min(4),
      password: Joi.string().required().min(8),
    }),
  });
};

const SigninValidator = (req: Request, res: Response, next: NextFunction) => {
  return validatorMiddleware(req, res, next, {
    bodySchema: Joi.object({
      username: Joi.string().required().min(4),
      password: Joi.string().required().min(8),
    }),
  });
};

const UsernameAvailabilityValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next, {
    paramsSchema: Joi.object({
      username: Joi.string().required().min(4),
    }),
  });
};

const AuthValidator = {
  signup: SignupValidator,
  signin: SigninValidator,
  usernameAvailability: UsernameAvailabilityValidator,
};

export default AuthValidator;
