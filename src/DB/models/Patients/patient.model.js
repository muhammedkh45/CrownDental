import mongoose from "mongoose";
const patientGender = {
  male: "male",
  female: "female",
};
const userSchema = new mongoose.Schema({
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
  exMedicalStatus: {
    type: [String],
  },
  gender: {
    type: String,
    enum: Object.values(patientGender),
    required: [true, "Gender is required"],
  },
});

export const patientModel =
  mongoose.model.patient || mongoose.model("patient", userSchema);
