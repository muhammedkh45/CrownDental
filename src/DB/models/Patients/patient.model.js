import mongoose from "mongoose";
const patientGender = {
  male: "male",
  female: "female",
};
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
    exMedicalStatus: {
      type: [String],
    },
    gender: {
      type: String,
      enum: Object.values(patientGender),
      required: [true, "Gender is required"],
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "doctor",
    },
    role:{
      type:String,
      enum:["patient"],
      default:"patient"
    }
  },
);

export const patientModel =
  mongoose.model.patient || mongoose.model("patient", patientSchema);
