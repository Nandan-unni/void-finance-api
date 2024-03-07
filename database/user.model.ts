import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import { Transaction, TransactionSchema } from "./transaction.model";

const { Schema } = mongoose;

interface UserDocument extends Document {
  username: string;
  password: string;
  accounts: Array<Types.ObjectId>;
  transactions: Array<Transaction>;
  authenticate(password: string): Promise<boolean>;
}
const UserSchema = new Schema<UserDocument>({
  // uid: { type: String, required: true, unique: true },
  username: { type: String, default: null, required: true },
  password: { type: String, required: true },
  accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  transactions: [TransactionSchema],
});

// UserSchema.virtual("id").get(function () {
//   return this.uid;
// });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.authenticate = async function (password: string) {
  console.log({ pass: password, thisPass: this.password });
  return bcrypt.compare(password, this.password);
};

let User = mongoose.model("User", UserSchema);

export default User;
