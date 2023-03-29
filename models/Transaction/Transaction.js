import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    referenceCode: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String, required: true },
    state: {
      type: String,
      required: true,
      default: "PENDING",
      enum: ["PENDING", "APPROVED", "DECLINED", "ERROR", "EXPIRED", "VOIDED"],
    },
    paymentMethod: { type: String },
    payerEmail: { type: String, required: true },
    transactionDate: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
