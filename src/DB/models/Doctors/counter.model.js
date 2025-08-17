import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({ value: Number });

const counterModel =
  mongoose.model.counter || mongoose.model("counter", counterSchema);

export default counterModel;
