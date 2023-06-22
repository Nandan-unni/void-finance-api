import mongoose from "mongoose";
import { TransactionSchema } from "./transaction.model";

const { Schema } = mongoose;

const UserSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, default: null },
  email: { type: String, default: null, required: true },
  transactions: [TransactionSchema],
});

UserSchema.virtual("id").get(function () {
  return this.uid;
});

let User = mongoose.model("User", UserSchema);

export default User;
