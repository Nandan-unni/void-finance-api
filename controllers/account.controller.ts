import { Request, Response } from "express";
import { logger } from "../common/utils";
import User from "../database/user.model";
import Account from "../database/account.model";

const CreateAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body;

    const user = await User.findOne({ uid: req.headers.uid });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    const newAccount = {
      holder: user._id,
      bank: data.bank,
      type: data.type,
      label: data.label,
      balance: data.balance,
      number: data.number,
      country: data.country,
    };

    const account = await Account.create(newAccount);
    user.accounts.push(account._id);
    await user.save();

    return res.status(201).send({
      success: true,
      message: "Account created!",
    });
  } catch (error) {
    logger.error(error, "CreateAccount()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const ListAccounts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findOne({ uid: req.headers.uid })
      .populate("accounts")
      .exec();
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Accounts found!",
      data: user.accounts,
    });
  } catch (error) {
    logger.error(error, "ListAccounts()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const GetAccount = async (req: Request, res: Response): Promise<Response> => {
  try {
    const account = await Account.findById(req.params.aid);
    if (!account) {
      return res.status(404).send({
        success: false,
        message: "Account not found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Account found!",
      data: account,
    });
  } catch (error) {
    logger.error(error, "GetAccount()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const UpdateAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body;
    const account = await Account.findByIdAndUpdate(req.params.aid, data);

    if (!account) {
      return res.status(404).send({
        success: false,
        message: "Account not found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Account updated!",
    });
  } catch (error) {
    logger.error(error, "UpdateAccount()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const DeleteAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const account = await Account.findByIdAndDelete(req.params.aid);
    if (!account) {
      return res.status(404).send({
        success: false,
        message: "Account not found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Account deleted!",
    });
  } catch (error) {
    logger.error(error, "DeleteAccount()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const AccountController = {
  create: CreateAccount,
  list: ListAccounts,
  get: GetAccount,
  update: UpdateAccount,
  delete: DeleteAccount,
};
export default AccountController;
