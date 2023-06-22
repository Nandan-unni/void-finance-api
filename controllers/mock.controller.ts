import { Request, Response } from "express";
import { logger } from "../common/utils";

const ActionModel = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res;
  } catch (error) {
    logger.error(error, "ActionModel()");
    return res
      .status(500)
      .send({ success: false, message: `${error.name}: ${error.message}` });
  }
};

const ModelController = {
  action: ActionModel,
};
export default ModelController;
