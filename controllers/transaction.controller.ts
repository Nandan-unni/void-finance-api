import { Request, Response } from "express";
import { logger } from "../common/utils";
import User from "../database/user.model";
import { calculateSheet } from "../common/utils/sheet";

const CreateTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body;
    const newTransaction = {
      amount: data.amount,
      mode: data.mode,
      label: data.label,
      desc: data.desc,
      timestamp: data.timestamp,
      category: data.category,
      subCategory: data.subCategory,
    };

    const user = await User.findOneAndUpdate(
      { uid: req.headers.uid },
      { $push: { transactions: newTransaction } },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Transaction created!",
    });
  } catch (error) {
    logger.error(error, "CreateTransaction()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const ListTransactions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.findOne({ uid: req.headers.uid });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    const sheet = calculateSheet(user.transactions);
    return res.status(200).send({
      success: true,
      message: "Transactions found!",
      data: {
        transactions: user.transactions.sort(
          (a, b) => b.timestamp - a.timestamp
        ),
        sheet,
      },
    });
  } catch (error) {
    logger.error(error, "ListTransactions()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const GetTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.findOne({ uid: req.headers.uid });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    const transaction = user.transactions.find(
      (tn) => tn._id?.toString() === req.params.tid
    );
    if (!transaction) {
      return res.status(404).send({
        success: false,
        message: "Transaction not found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Transaction found!",
      data: transaction,
    });
  } catch (error) {
    logger.error(error, "GetTransaction()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const UpdateTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body;
    const user = await User.findOne({ uid: req.headers.uid });
    let transaction = null;
    if (user) {
      transaction = user?.transactions.find(
        (tn) => tn._id?.toString() === req.params.tid
      );
    }
    if (!transaction) {
      return res.status(404).send({
        success: false,
        message: "Transaction not found!",
      });
    }
    transaction = { ...transaction.toObject(), ...data };
    const response = await User.updateOne(
      { uid: req.headers.uid, "transactions._id": req.params.tid },
      { $set: { "transactions.$": transaction } },
      { new: true }
    );
    if (response.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Transaction updated!",
    });
  } catch (error) {
    logger.error(error, "UpdateTransaction()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const DeleteTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.findOneAndUpdate(
      { uid: req.headers.uid },
      { $pull: { transactions: { _id: req.params.tid } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Transaction deleted!",
    });
  } catch (error) {
    logger.error(error, "DeleteTransaction()");
    return res.status(500).send({
      success: false,
      message: `${error.name}: ${error.message}`,
    });
  }
};

const TransactionController = {
  create: CreateTransaction,
  list: ListTransactions,
  get: GetTransaction,
  update: UpdateTransaction,
  delete: DeleteTransaction,
};
export default TransactionController;
