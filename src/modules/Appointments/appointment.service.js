import { appointmentModel } from "../../DB/models/Appointments/appointment.model.js";
import { patientModel } from "../../DB/models/Patients/patient.model.js";
import { doctorModel } from "../../DB/models/Doctors/doctor.model.js";

export const reserveAppointment = async (req, res, next) => {
  try {
    const { patient, doctor, appointmentTime, status } = req.body;
    const isExists = await appointmentModel.findOne({ appointmentTime });
    if (isExists) {
      throw new Error("This time is already reserved try anthor time", {
        cause: 409,
      });
    }
    const isPatient = await patientModel.findOne({ _id: patient });
    const isDoctor = await doctorModel.findOne({ _id: doctor });
    if (!isDoctor || !isPatient) {
      throw new Error("Doctor or Patient not Exists.", { cause: 404 });
    }
    const appointment = await appointmentModel.create({
      patient,
      doctor,
      appointmentTime,
      status,
    });
    return res
      .status(201)
      .json({ messsage: "Appointment added succefully", appointment });
  } catch (error) {
    throw new Error(error.messsage, { cause: error.cause });
  }
};
export const listReservations = async (req, res, next) => {
  try {
    const reservations = await appointmentModel.find({});
    return res
      .status(200)
      .json({ messsage: "Reservations list", reservations });
  } catch (error) {
    throw new Error(error.messsage, { cause: error.cause });
  }
};
export const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isExists = await appointmentModel.findOne({ _id: id });
    if (!isExists) {
      throw new Error("Reservation not found", { cause: 404 });
    }
    const { patient, doctor, appointmentTime, status } = req.body;
    const reservationData = {};
    if (patient) {
      const isPatient = await patientModel.findOne({ _id: patient });
      if (!isPatient) {
        throw new Error("Patient not found", { cause: 404 });
      }
      reservationData.patient = patient;
    }
    if (doctor) {
      const isDoctor = await doctorModel.findOne({ _id: doctor });
      if (!isDoctor) {
        throw new Error("Doctor not found", { cause: 404 });
      }
      reservationData.doctor = doctor;
    }
    if (appointmentTime) {
      const isAppointment = await appointmentModel.findOne({ appointmentTime });
      if (!isAppointment) {
        throw new Error("This time is already reserved try anthor time", {
          cause: 404,
        });
      }
      reservationData.appointmentTime = appointmentTime;
    }
    if (status) reservationData.status = status;
    const reservation = await appointmentModel.updateOne(
      { _id: id },
      reservationData
    );
    return res
      .status(200)
      .json({ messsage: "Reservation updated successfully", reservation });
  } catch (error) {
    throw new Error(error.messsage, { cause: error.cause });
  }
};
export const deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isExists = await appointmentModel.findOneAndDelete({ _id: id });
    if (!isExists) throw new Error("Reservation not found", { cause: 404 });
    return res
      .status(200)
      .json({ messsage: "Reservation deleted successfully", isExists });
  } catch (error) {
    throw new Error(error.messsage, { cause: error.cause });
  }
};
export const ReservationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isExists = await appointmentModel.findOne({ _id: id });
    if (!isExists) throw new Error("Reservation not found", { cause: 404 });
    return res.status(200).json({ messsage: "Reservation", isExists });
  } catch (error) {
    throw new Error(error.messsage, { cause: error.cause });
  }
};
