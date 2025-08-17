import mongoose from "mongoose";
const doctorGender = {
  male: "male",
  female: "female",
};
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    dob: {
      type: Date,
    },
    ssn: {
      type: String,
      required: [true, "SSN is required"],
    },
    gender: {
      type: String,
      enum: Object.values(doctorGender),
      required: [true, "Gender is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
  },
  {
    strict: false,
  }
);

export const doctorModel =
  mongoose.model.doctor || mongoose.model("doctor", doctorSchema);
