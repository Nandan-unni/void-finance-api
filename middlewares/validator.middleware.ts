import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  schemas?: {
    bodySchema?: Joi.ObjectSchema;
    paramsSchema?: Joi.ObjectSchema;
    querySchema?: Joi.ObjectSchema;
  }
): void | Response => {
  const errorResponse = (error: Joi.ValidationError) =>
    res.status(400).json({
      success: false,
      message: error?.message.split('"').join("'"),
    });
  if (schemas) {
    if (schemas.bodySchema) {
      const validation = schemas.bodySchema.validate(req.body);
      if (validation.error) return errorResponse(validation.error);
    }

    if (schemas.paramsSchema) {
      const validation = schemas.paramsSchema.validate(req.params);
      if (validation.error) return errorResponse(validation.error);
    }

    if (schemas.querySchema) {
      const validation = schemas.querySchema.validate(req.query);
      if (validation.error) return errorResponse(validation.error);
    }
  }

  return next();
};

export default validatorMiddleware;
