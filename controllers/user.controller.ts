import { Request, Response } from "express";
import { jwtAuth, logger } from "../common/utils";
import User from "../database/user.model";

const AuthenticateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let user = await User.findOne({ uid: req.body.uid });
    let isNewUser = false;
    if (!user) {
      isNewUser = true;
      user = await User.create({
        uid: req.body.uid,
        name: req.body.name,
        email: req.body.email,
      });
    }
    return res.status(isNewUser ? 201 : 200).send({
      success: true,
      message: "User authenticated!",
      data: {
        accessToken: jwtAuth.encode({ uid: user.id }),
        isNewUser: isNewUser,
      },
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
  authenticate: AuthenticateUser,
};

export default UserController;
