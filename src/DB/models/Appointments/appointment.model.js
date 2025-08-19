import mongoose from "mongoose";
export const appointmentStatus = {
  reserved: "reserved",
  done: "done",
  cancelled: "cancelled",
};

const appointmentSchema = new mongoose.Schema(
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
    appointmentTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(appointmentStatus),
      default: appointmentStatus.reserved,
    },
  },
  { timestamps: true }
);

export const appointmentModel =
  mongoose.model.appointment ||
  mongoose.model("appointment", appointmentSchema);
