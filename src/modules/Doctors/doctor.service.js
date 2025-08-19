import counterModel from "../../DB/models/Doctors/counter.model.js";
import { doctorModel } from "../../DB/models/Doctors/doctor.model.js";
import * as Encryption from "../../utils/Encryption/index.js";
import * as Hashing from "../../utils/Hash/index.js";
import { systemRoles } from "../../utils/systemRoles.js";
import * as Tokenization from "../../utils/token/index.js";
export const signupDoctor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      gender,
      dob,
      specialization,
    } = req.body;
    if (await doctorModel.findOne({ email }))
      throw new Error("Email already exist", { cause: 409 });

    const hashedPassword = await Hashing.hash({
      plainText: password,
      saltRounds: 10,
    });
    const ciphertext = await Encryption.encrypt({
      plainText: phone,
      signature: process.env.JWT_SECRET,
    });
    const counter = await counterModel.findOneAndUpdate(
      {},
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    const doctorData = {
      name: name,
      email,
      password: hashedPassword,
      phone: ciphertext,
      address: address,
      gender: gender,
      specialization: specialization,
      ssn: `DOC-${new Date().getFullYear()}-${String(counter.value).padStart(
        4,
        "0"
      )}`,
    };
    if (dob) doctorData.dob = dob;
    const doctor = await doctorModel.create(doctorData);
    return res.status(201).json({
      message: "Doctor added successfully.",
      doctor,
    });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
export const loginDoctor = async (req, res, next) => {
  try {
    const { ssn, password } = req.body;
    const doctor = await doctorModel.findOne({ ssn });
    if (!doctor) {
      throw new Error("Doctor not found", { cause: 404 });
    }
    const isCorrect = await Hashing.compare({
      plainText: password,
      cipherText: doctor.password,
    });
    const token = await Tokenization.generateToken({
      payload: {
        id: doctor._id,
        ssn: doctor.ssn,
        role: systemRoles.DOCTOR,
      },
      Signature: process.env.JWT_DOCTOR_SECRET,
      options: { expiresIn: "1h" },
    });
    return res
      .status(200)
      .json({ message: "Login success", accessToken: token });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};

export const listDoctors = async (req, res, next) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select("-_id name ssn specialization");
    return res.status(200).json({
      message: "Doctors list",
      doctors,
    });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
export const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doctorExists = await doctorModel.findById(id);
    if (!doctorExists) {
      throw new Error("Doctor not found", { cause: 404 });
    }

    const { name, phone, address, gender, dob, ssn, specialization } = req.body;
    const doctorData = {};

    if (name) doctorData.name = name;
    if (address) doctorData.address = address;
    if (gender) doctorData.gender = gender;
    if (phone) {
      const phoneHash = await Hashing.fixedHash(phone);
      let exists = await DoctorModel.findOne({
        phoneHash,
        _id: { $ne: id },
      });
      if (exists)
        throw new Error("Doctor's Phone already exists", { cause: 409 });

      const ciphertext = await Encryption.encrypt({
        plainText: phone,
        signature: process.env.JWT_SECRET,
      });
      doctorData.phone = ciphertext;
      doctorData.phoneHash = phoneHash;
    }

    if (ssn) {
      exists = await DoctorModel.findOne({
        ssn,
      });
      if (exists) throw new Error("Doctor already exists", { cause: 409 });
      doctorData.ssn = ssn;
    }
    if (dob) doctorData.dob = dob;
    if (specialization) doctorData.specialization = specialization;

    await doctorModel.updateOne({ _id: id }, doctorData);
    return res.status(200).json({ message: "Doctor updated successfully." });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await doctorModel
      .findByIdAndDelete(id)
      .select("name ssn");
    if (!deletedDoctor) throw new Error("Doctor not found", { cause: 404 });

    return res
      .status(200)
      .json({ message: "Doctor deleted successfully.", deletedDoctor });
  } catch (error) {
    throw new Error(error.message, { cause: error.cause });
  }
};
