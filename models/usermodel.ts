import mongoose, { Schema } from "mongoose";

// User Schema
const UserSchema = new Schema({
  email: String,
  name: String,
  number: String,
  password: String,
  onRampTransactions: [{ type: Schema.Types.ObjectId, ref: 'OnRampTransaction' }],
  balances: [{ type: Schema.Types.ObjectId, ref: 'Balance' }],
  forgetpasswordtoken: String,
  forgetpasswordexpiry: Date,
  verifyToken: String,
  verifyTokenexpiry: Date,
});

// OnRampTransaction Schema
const TransactionSchema = new Schema({
  status: String,
  token: String,
  provider: String,
  amount: Number,
  startTime: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// Balance Schema
const BalanceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  amount: Number,
  locked: Number,
});

// Models
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
export const Balance = mongoose.models.Balance || mongoose.model("Balance", BalanceSchema);
