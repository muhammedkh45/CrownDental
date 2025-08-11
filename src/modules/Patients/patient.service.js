import { patientModel } from "../../DB/models/Patients/patient.model.js";
import * as Encryption from "../../utils/index.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("src/config/.env") });
export const AddNewPatient = async (req, res, next) => {
  try {
    const { name, phone, address, gender, dob, exMedicalStatus } = req.body;
    const ciphertext = await Encryption.encrypt({
      plainText: phone,
      signature: process.env.JWT_SECRET,
    });
    const patientData = {
      name: name,
      phone: ciphertext,
      address: address,
      gender: gender,
    };
    if (exMedicalStatus) patientData.exMedicalStatus = exMedicalStatus;
    if (dob) patientData.dob = dob;
    const patient = await patientModel.create(patientData);
    return res.status(201).json({
      message: "Patient added successfully.",
      patient,
    });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
