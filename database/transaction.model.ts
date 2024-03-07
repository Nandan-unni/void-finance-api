import mongoose, { Document } from "mongoose";
import { TransactionModes } from "../common/constants";

const { Schema } = mongoose;

interface Transaction extends Document {
  amount: number;
  mode: TransactionModes;
  label: string;
  desc: string;
  timestamp: number;
  category: string;
  subCategory: string;
}
const TransactionSchema = new Schema<Transaction>({
  amount: { type: Number, required: true },
  mode: { type: String, enum: TransactionModes, required: true },
  label: { type: String, required: true },
  desc: { type: String },
  timestamp: { type: Number, required: true },
  category: { type: String },
  subCategory: { type: String },
});

// let Transaction = mongoose.model("Transaction", TransactionSchema);

export { TransactionSchema, Transaction };
// export default Transaction;
