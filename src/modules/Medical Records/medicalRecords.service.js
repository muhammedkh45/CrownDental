import { doctorModel } from "../../DB/models/Doctors/doctor.model.js";
import { patientModel } from "../../DB/models/Patients/patient.model.js";
import { appointmentModel } from "../../DB/models/Appointments/appointment.model.js";
import { medicalRecordModel } from "../../DB/models/Medical Records/medicalRecords.model.js";
import cloudinary from "../../utils/cloudinary/index.js";
export const addMedicalNotes = async (req, res, next) => {
  try {
    const {
      patient,
      doctor,
      appointment,
      diagnosis,
      symptoms,
      prescriptions,
      labTests,
      allergies,
      pastMedicalHistory,
      notes,
      recordDate,
    } = req.body;
    const isPatient = await patientModel.findOne({ _id: patient });
    const isDoctor = await doctorModel.findOne({ _id: doctor });
    const isAppointment = await appointmentModel.findOne({ _id: appointment });
    if (!isPatient || !isDoctor || !isAppointment) {
      throw new Error("Patient, Doctor or Appointment not found", {
        cause: 404,
      });
    }
    let medicalRecordImage = {};
    if (req.file) {
      const uploaded = await cloudinary.uploader
        .upload(req.file.path, {
          folder: `CrownDental/MedicalRecords/${patient}`,
          use_filename: true,
          resource_type: "auto",
        });
      medicalRecordImage = { public_id: uploaded.public_id, secure_url: uploaded.secure_url };
    }
    const medicalNote = await medicalRecordModel.create({
      patient,
      doctor,
      appointment,
      diagnosis,
      symptoms,
      prescriptions,
      labTests,
      allergies,
      pastMedicalHistory,
      notes,
      image: medicalRecordImage,
      recordDate,
    });
    return res
      .status(201)
      .json({ message: "Medical record added successfully", medicalNote });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
export const updateMedicalNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      diagnosis,
      symptoms,
      prescriptions,
      labTests,
      allergies,
      pastMedicalHistory,
      notes,
      recordDate,
    } = req.body;

    const medicalNote = await medicalRecordModel.findById(id);

    if (!medicalNote) {
      throw new Error("Medical record not found", { cause: 404 });
    }
    if (req.file) {
      if (medicalNote.image && medicalNote.image.public_id) {
        await cloudinary.uploader.destroy(medicalNote.image.public_id);
      }
      const uploaded = await cloudinary.uploader
        .upload(req.file.path, {
          folder: `CrownDental/MedicalRecords/${medicalNote.patient}`,
          use_filename: true,
          resource_type: "auto",
        });
      medicalNote.image = { public_id: uploaded.public_id, secure_url: uploaded.secure_url };
    }

    medicalNote.diagnosis = diagnosis || medicalNote.diagnosis;
    medicalNote.symptoms = symptoms || medicalNote.symptoms;
    medicalNote.prescriptions = prescriptions || medicalNote.prescriptions;
    medicalNote.labTests = labTests || medicalNote.labTests;
    medicalNote.allergies = allergies || medicalNote.allergies;
    medicalNote.pastMedicalHistory =
      pastMedicalHistory || medicalNote.pastMedicalHistory;
    medicalNote.notes = notes || medicalNote.notes;
    medicalNote.recordDate = recordDate || medicalNote.recordDate;

    await medicalNote.save();

    return res
      .status(200)
      .json({ message: "Medical record updated successfully", medicalNote });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
