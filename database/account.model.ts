import mongoose from "mongoose";
import { AccountTypes, Banks, Countries } from "../common/constants";

const { Schema } = mongoose;

const AccountSchema = new Schema({
  holder: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bank: { type: String, enum: Banks, required: true },
  type: { type: String, enum: AccountTypes, required: true },
  label: { type: String, required: true },
  balance: { type: Number, required: true },
  number: { type: Number, default: "****" },
  country: { type: String, enum: Countries, required: true },
});

let Account = mongoose.model("Account", AccountSchema);

export default Account;
