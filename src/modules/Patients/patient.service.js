import { doctorModel } from "../../DB/models/Doctors/doctor.model.js";
import { patientModel } from "../../DB/models/Patients/patient.model.js";
import * as Encryption from "../../utils/Encryption/index.js";
import * as Hashing from "../../utils/Hash/index.js";
import { systemRoles } from "../../utils/systemRoles.js";
import * as Tokenization from "../../utils/token/index.js";
export const signUpPatient = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      gender,
      dob,
      exMedicalStatus,
      doctor_id,
    } = req.body;
    const exists = await patientModel.findOne({ email });
    if (exists) {
      throw new Error("Email already exists", { cause: 409 });
    }
    const doctor = await doctorModel.findById(doctor_id).select(" name ssn");
    if (!doctor) {
      throw new Error("Doctor not Exist", { cause: 409 });
    }
    const hashedPassword = await Hashing.hash({
      plainText: password,
      saltRounds: 10,
    });
    const ciphertext = await Encryption.encrypt({
      plainText: phone,
      signature: process.env.JWT_SECRET,
    });
    const patientData = {
      name,
      email,
      password: hashedPassword,
      phone: ciphertext,
      address,
      gender,
      doctor: doctor_id,
    };
    if (exMedicalStatus) patientData.exMedicalStatus = exMedicalStatus;
    if (dob) patientData.dob = dob;
    const patient = await patientModel.create(patientData);
    const patientResponse = {
      name: patient.name,
      exMedicalStatus: patient.exMedicalStatus,
      doctor,
    };
    return res.status(201).json({
      message: "Patient added successfully.",
      patient: patientResponse,
    });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
export const loginPatient = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const patient = await patientModel.findOne({ email });
    if (!patient) {
      throw new Error("Patient not found", { cause: 404 });
    }
    const isCorrect = await Hashing.compare({
      plainText: password,
      cipherText: patient.password,
    });
    if (!isCorrect)
      throw new Error("Email or Password is Invalid", { cause: 401 });

    const token = await Tokenization.generateToken({
      payload: {
        id: patient._id,
        email: patient.email,
        role: systemRoles.PATIENT,
      },
      Signature: process.env.JWT_PATIENT_SECRET,
      options: { expiresIn: "1h" },
    });
    return res
      .status(200)
      .json({ message: "Login success", accessToken: token });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
export const listPatients = async (req, res, next) => {
  try {
    const patients = await patientModel
      .find({})
      .select("-_id name gender exMedicalStatus");
    return res.status(200).json({
      message: "Patients list",
      patients,
    });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
export const updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patientExists = await patientModel.findById(id);
    if (!patientExists) {
      throw new Error("Patient not found", { cause: 404 });
    }

    const { name, phone, address, gender, dob, exMedicalStatus, doctor_id } =
      req.body;
    const patientData = {};

    if (name) patientData.name = name;
    if (address) patientData.address = address;
    if (gender) patientData.gender = gender;

    if (doctor_id) {
      const doctor = await doctorModel.findById(doctor_id);
      if (!doctor) throw new Error("Doctor not exist", { cause: 409 });
      patientData.doctor = doctor_id;
    }

    if (phone) {
      const phoneHash = await Hashing.fixedHash(phone);
      const exists = await patientModel.findOne({
        phoneHash,
        _id: { $ne: id },
      });
      if (exists) throw new Error("Patient already exists", { cause: 409 });

      const ciphertext = await Encryption.encrypt({
        plainText: phone,
        signature: process.env.JWT_SECRET,
      });
      patientData.phone = ciphertext;
      patientData.phoneHash = phoneHash;
    }

    if (exMedicalStatus) patientData.exMedicalStatus = exMedicalStatus;
    if (dob) patientData.dob = dob;

    await patientModel.updateOne({ _id: id }, patientData);
    return res.status(200).json({ message: "Patient updated successfully." });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};

export const deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPatient = await patientModel
      .findByIdAndDelete(id)
      .select("name gender");
    if (!deletedPatient) throw new Error("Patient not found", { cause: 404 });

    return res
      .status(200)
      .json({ message: "Patient deleted successfully.", deletedPatient });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
