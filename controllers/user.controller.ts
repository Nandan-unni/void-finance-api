import { Request, Response } from "express";
import { logger } from "../common/utils";
import User from "../database/user.model";

const GetUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findOne({ _id: req.headers.uid });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found!" });
    }
    return res.status(200).send({
      success: true,
      message: "User found!",
      data: user,
    });
  } catch (error) {
    logger.error(error, "AuthenticateUser()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const UserController = {
  get: GetUser,
};

export default UserController;
