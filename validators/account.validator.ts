import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { validatorMiddleware } from "../middlewares";
import { AccountTypes, Banks, Countries } from "../common/constants";

const CreateAccountValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next, {
    bodySchema: Joi.object({
      bank: Joi.string()
        .required()
        .valid(...Banks),
      type: Joi.string()
        .required()
        .valid(...AccountTypes),
      label: Joi.string().required(),
      balance: Joi.number().required(),
      number: Joi.number(),
      country: Joi.string()
        .required()
        .valid(...Countries),
    }),
  });
};

const ListAccountValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next);
};

const GetAccountValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next, {
    paramsSchema: Joi.object({
      aid: Joi.string().required(),
    }),
  });
};
const UpdateAccountValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next, {
    paramsSchema: Joi.object({
      aid: Joi.string().required(),
    }),
    bodySchema: Joi.object({
      bank: Joi.string().valid(...Banks),
      type: Joi.string().valid(...AccountTypes),
      label: Joi.string(),
      balance: Joi.number(),
      number: Joi.number(),
      country: Joi.string().valid(...Countries),
    }),
  });
};
const DeleteAccountValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next, {
    paramsSchema: Joi.object({
      aid: Joi.string().required(),
    }),
  });
};

const AccountValidator = {
  create: CreateAccountValidator,
  list: ListAccountValidator,
  get: GetAccountValidator,
  update: UpdateAccountValidator,
  delete: DeleteAccountValidator,
};

export default AccountValidator;
