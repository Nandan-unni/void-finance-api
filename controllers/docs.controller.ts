import { Request, Response } from "express";
import config from "../common/config/index";

export const IndexController = (req: Request, res: Response): Response => {
  return res.status(200).json({
    success: true,
    message: `PROJECT M`,
    data: {
      status: "Running",
      env: config.ENV,
      version: config.VERSION,
      host: req.hostname,
    },
  });
};

const DocsController = {
  index: IndexController,
};

export default DocsController;
