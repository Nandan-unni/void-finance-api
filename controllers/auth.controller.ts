import { Request, Response } from "express";
import { jwtAuth, logger } from "../common/utils";
import User from "../database/user.model";

const Signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user)
      return res.status(400).send({
        success: false,
        message: "Username already in use.",
      });
    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(201).send({
      success: true,
      message: "User created",
      data: { accessToken: jwtAuth.encode({ uid: newUser.id, username }) },
    });
  } catch (error) {
    logger.error(error, "Signup()");
    return res.status(400).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const Signin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      const isAuthenticated = await user.authenticate(password);
      if (isAuthenticated) {
        return res.status(200).send({
          success: true,
          message: "User authenticated",
          data: { accessToken: jwtAuth.encode({ uid: user.id, username }) },
        });
      }
      return res.status(401).send({
        success: false,
        message: "Incorrect username or password.",
      });
    }
    return res.status(401).send({
      success: false,
      message: "Incorrect username or password.",
    });
  } catch (error) {
    logger.error(error, "Signin()");
    return res.status(400).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const UsernameAvailability = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(200).send({
        success: true,
        message: "Username not available",
        data: { isAvailable: false },
      });
    }
    return res.status(200).send({
      success: true,
      message: "Username available",
      data: { isAvailable: true },
    });
  } catch (error) {
    logger.error(error, "UsernameAvailability()");
    return res.status(400).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const AuthController = {
  signup: Signup,
  signin: Signin,
  usernameAvailability: UsernameAvailability,
};

export default AuthController;
