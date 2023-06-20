import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  return res
    .status(500)
    .json({ success: false, message: err.toString(), data: err });
};

export default errorMiddleware;
