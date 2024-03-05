import { NextFunction, Request, Response } from "express";
import { OPEN_END_POINTS } from "../routers/routes";
import { jwtAuth } from "../common/utils";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  // return next();
  if (OPEN_END_POINTS.includes(req.url)) return next();

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({
      success: false,
      message: "Authentication failed!",
    });
  } else if (!authHeader.startsWith("Bearer")) {
    return res.status(401).send({
      success: false,
      message: "Authentication failed!",
    });
  } else if (authHeader.split(" ").length !== 2) {
    return res.status(401).send({
      success: false,
      message: "Authentication failed!",
    });
  }

  const token = authHeader.split(" ")[1];
  const data: any = jwtAuth.decode(token);
  req.headers["uid"] = data["uid"];
  console.log(data["uid"], "08Su62OoH7U1rNfOxrRql5Rd8cMa");
  return next();
};

export default authMiddleware;
