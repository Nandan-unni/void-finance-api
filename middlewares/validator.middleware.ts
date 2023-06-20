import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: Joi.ObjectSchema
): void | Response => {
  let dataToValidate: Request["body"] | Request["params"] | object;

  if (["POST", "PUT", "PATCH"].includes(req.method)) dataToValidate = req.body;
  else if (["GET", "DELETE"].includes(req.method)) dataToValidate = req.params;
  else dataToValidate = {};

  const validation = schema.validate(dataToValidate);
  if (validation.error)
    return res.status(400).json({
      success: false,
      message: validation.error.message.split('"').join("'"),
    });
  return next();
};

export default validatorMiddleware;
