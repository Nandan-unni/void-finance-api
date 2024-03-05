import { Schema, Types } from "mongoose";
import { TransactionSchema } from "../../database/transaction.model";
import { TransactionModes } from "../constants";

export const calculateSheet = (
  transactions: Types.DocumentArray<typeof TransactionSchema.methods>
) => {
  const expenses = transactions.filter(
    (t) => t.mode === TransactionModes.EXPENSE
  );
  const incomes = transactions.filter(
    (t) => t.mode === TransactionModes.INCOME
  );
  const totalIncome = incomes.map((t) => t.amount).reduce((p, c) => p + c);
  const totalExpense = expenses.map((t) => t.amount).reduce((p, c) => p + c);
  const balance = totalIncome - totalExpense;
  return { totalIncome, totalExpense, balance };
};
