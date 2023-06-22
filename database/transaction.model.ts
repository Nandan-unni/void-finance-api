import mongoose from "mongoose";
import { TransactionModes } from "../common/constants";

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  mode: { type: String, enum: TransactionModes, required: true },
  label: { type: String, required: true },
  desc: { type: String },
  timestamp: { type: Number, required: true },
  category: { type: String },
  subCategory: { type: String },
});

// let Transaction = mongoose.model("Transaction", TransactionSchema);

export { TransactionSchema };
// export default Transaction;
