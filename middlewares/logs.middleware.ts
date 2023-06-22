import { NextFunction, Request, Response } from "express";
import { getDurationInMs } from "../common/utils";
import moment from "moment";

const logsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requestTime: [number, number] = process.hrtime();
  const requestTimeLog: string = moment().format("DD MMM YYYY - HH:mm");
  res.on("finish", () => {
    let log: string = "";
    log += `${req.method}: ${res.statusCode} ${req.baseUrl}${req.url}\n`;
    log += `${getDurationInMs(requestTime)
      .toFixed(2)
      .toString()}ms: ${requestTimeLog}`;
    console.log(`\n🟡 log-request => ${log}`);
  });
  next();
};

export default logsMiddleware;
