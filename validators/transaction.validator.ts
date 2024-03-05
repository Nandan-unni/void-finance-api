import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { validatorMiddleware } from "../middlewares";
import { TransactionModes } from "../common/constants";

const CreateTransactionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next, {
    bodySchema: Joi.object({
      amount: Joi.number().required().min(1),
      mode: Joi.string()
        .required()
        .valid(...Object.values(TransactionModes)),
      label: Joi.string().required(),
      desc: Joi.string().min(0),
      timestamp: Joi.number().required(),
      category: Joi.string(),
      subCategory: Joi.string().min(0),
    }),
  });
};

const ListTransactionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next);
};

const GetTransactionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next, {
    paramsSchema: Joi.object({
      tid: Joi.string().required(),
    }),
  });
};
const UpdateTransactionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next, {
    paramsSchema: Joi.object({
      tid: Joi.string().required(),
    }),
    bodySchema: Joi.object({
      amount: Joi.number().min(1),
      label: Joi.string(),
      desc: Joi.string(),
      timestamp: Joi.number(),
      category: Joi.string(),
      subCategory: Joi.string(),
    }),
  });
};
const DeleteTransactionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return validatorMiddleware(req, res, next, {
    paramsSchema: Joi.object({
      tid: Joi.string().required(),
    }),
  });
};

const TransactionValidator = {
  create: CreateTransactionValidator,
  list: ListTransactionValidator,
  get: GetTransactionValidator,
  update: UpdateTransactionValidator,
  delete: DeleteTransactionValidator,
};

export default TransactionValidator;
