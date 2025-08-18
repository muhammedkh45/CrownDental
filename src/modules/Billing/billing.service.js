import { billingModel } from "../../DB/models/Billing/billing.model";
import { patientModel } from "../../DB/models/Patients/patient.model.js";
import { doctorModel } from "../../DB/models/Doctors/doctor.model.js";
import { appointmentModel } from "../../DB/models/Appointments/appointment.model.js";
export const addBilling = async (req, res, next) => {
  try {
    const {
      patient,
      appointment, 
      doctor,
      items,
      totalAmount,
      discount,
      netAmount,
      paymentStatus,
      paymentMethod,
      billingDate,
    } = req.body;
    const isPatient = await patientModel.findOne({ _id: patient });
    const isDoctor = await doctorModel.findOne({ _id: doctor });
    const isAppointment = await appointmentModel.findOne({ _id: appointment });

    if (!isPatient || !isDoctor || !isAppointment) {
      throw new Error("Patient, Doctor or Appointment is not found", {
        cause: 404,
      });
    }

    const billing = await billingModel.create({
      patient,
      appointment,
      doctor,
      items,
      totalAmount,
      discount,
      netAmount,
      paymentStatus,
      paymentMethod,
      billingDate,
    });
    return res
      .status(201)
      .json({ message: "Billing added Successfully", billing });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
export const listPatientBills = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isPatient = await patientModel.findOne({ _id: id });

    if (!isPatient) {
      throw new Error("Patient not found", {
        cause: 404,
      });
    }
    const billis = await patientModel.find({ patient: id });
    return res.status(201).json({ message: "Patient  list of billis", billis });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
export const updateBilling = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      patient,
      appointment,
      doctor,
      items,
      totalAmount,
      discount,
      paymentStatus,
      paymentMethod,
      billingDate,
    } = req.body;
    const billingData = {};
    const isExists = await billingModel.findOne({ _id: id });
    if (!isExists) {
      throw new Error("Billing not found", {
        cause: 404,
      });
    }

    if (patient) {
      const isPatient = await patientModel.findOne({ _id: patient });
      if (!isPatient) {
        throw new Error("Patient not found", {
          cause: 404,
        });
      }
      billingData.patient = patient;
    }
    if (doctor) {
      const isDoctor = await doctorModel.findOne({ _id: doctor });
      if (!isDoctor) {
        throw new Error("Doctor not found", {
          cause: 404,
        });
      }
      billingData.doctor = doctor;
    }
    if (appointment) {
      const isAppointment = await appointmentModel.findOne({
        _id: appointment,
      });
      if (!isAppointment) {
        throw new Error("Appointment not found", {
          cause: 404,
        });
      }
      billingData.appointment = appointment;
    }
    if (items && items.length) billingData.items = items;
    if (totalAmount) billingData.totalAmount = totalAmount;
    if (discount) billingData.discount = discount;
    billingData.netAmount = totalAmount - discount;
    if (paymentStatus) billingData.paymentStatus = paymentStatus;
    if (paymentMethod) billingData.paymentMethod = paymentMethod;
    if (billingDate) billingData.billingData = billingData;

    const billing = await patientModel.updateOne({ _id: id }, billingDate, {
      new: true,
    });
    return res
      .status(201)
      .json({ message: "Billing updated successfully", billing });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
