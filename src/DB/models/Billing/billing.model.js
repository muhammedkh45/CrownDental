import mongoose from "mongoose";
export const paymentStatus = {
  pending: "pending",
  paid: "paid",
  partial: "partial",
  cancelled: "cancelled",
};
export const paymentMethods = {
  cash: "cash",
  credit_card: "credit_card",
  debit_card: "debit_card",
  insurance: "insurance",
  online: "online",
};

const billingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    appointment: {
      type: mongoose.Types.ObjectId,
      ref: "appointment",
      required: true,
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    items: [
      {
        description: { type: String, required: true },
        cost: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
        total: { type: Number },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    netAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(paymentStatus),
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: Object.values(paymentMethods),
      default: "cash",
    },
    billingDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const billingModel =
  mongoose.model.billing || mongoose.model("billing", billingSchema);
