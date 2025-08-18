import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    appointment: {
      type: mongoose.Types.ObjectId,
      ref: "appointment",
    },
    diagnosis: {
      type: String,
      required: true,
    },
    symptoms: [String],
    prescriptions: [
      {
        medicineName: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        duration: { type: String },
        notes: { type: String },
      },
    ],
    labTests: [
      {
        testName: { type: String, required: true },
        result: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    allergies: [String],
    pastMedicalHistory: [String],
    notes: { type: String },
    recordDate: {
      type: Date,
      default: Date.now,
    },
    img: {
      type: string,
    },
  },
  { timestamps: true }
);

export const medicalRecordModel =
  mongoose.model.medicalRecord ||
  mongoose.model("medicalRecord", medicalRecordSchema);
