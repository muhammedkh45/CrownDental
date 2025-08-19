import { adminModel } from "../../DB/models/Admins/admin.model.js";
import * as Hashing from "../../utils/Hash/index.js"
import * as Encryption  from "../../utils/Encryption/index.js"
import * as Tokenization  from "../../utils/token/index.js"
import cloudinary from "../../utils/cloudinary/index.js";

export const signUpAdmin = async (req, res, next) => {
  const { userName, email, password, phone, address, role } = req.body;
  const isEmailExist = await adminModel.findOne({ email });
  if (isEmailExist) {
    throw new Error("Email already exist", { cause: 409 });
  }
  const hashedPassword = await Hashing.hash({plainText:password, saltRounds:10});
  const encryptedPhone = await Encryption.encrypt({
    plainText: phone,
    signature: process.env.JWT_SECRET,
  });
  if (!req.file) {
    throw new Error("Image is required", { cause: 400 });
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `CrownDental/Admins/${userName}`,
    }
  );
  const newAdmin = await adminModel.create({
    userName,
    email,
    password: hashedPassword,
    phone: encryptedPhone,
    address,
    role,
    image: { secure_url, public_id },
  });
  if (!newAdmin) {
    throw new Error("Admin not added", { cause: 400 });
  }
  res.status(201).json({ message: "Admin added successfully", newAdmin });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email });
  if (!admin) {
    throw new Error("Invalid email or password", { cause: 404 });
  }
  const isPasswordMatched = await Hashing.compare({
    plainText: password,
    cipherText: admin.password,
  });
  if (!isPasswordMatched) {
    throw new Error("Invalid email or password", { cause: 404 });
  }
  
  const token = await Tokenization.generateToken({
    payload: {
      id: admin._id,
      role: admin.role,
      email: admin.email,
    },
    Signature: process.env.JWT_ADMIN_SECRET,
    options:{expiresIn: "1h"},
  });
  admin.isEmailConfirmed = true;
  await admin.save();
  return res.status(200).json({ message: "Login success", accessToken:token });
};


export const updateAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { userName, email, phone, address, role } = req.body;
  const adminExist = await adminModel.findById(id).select(" userName email ");
  if (!adminExist) {
    throw new Error("Admin not found", { cause: 404 });
  }
  if (email && email !== adminExist.email) {
    const isEmailExist = await adminModel.findOne({ email });
    if (isEmailExist) {
      throw new Error("Email already exist", { cause: 409 });
    }
  }
  if (req.file) {
    await cloudinary.uploader.destroy(adminExist.image.public_id);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `CrownDental/Admins/${userName || adminExist.userName}`,
      }
    );
    adminExist.image = { secure_url, public_id };
  }
  adminExist.userName = userName || adminExist.userName;
  adminExist.email = email || adminExist.email;
  adminExist.phone = phone || adminExist.phone;
  adminExist.address = address || adminExist.address;
  adminExist.role = role || adminExist.role;

  await adminExist.save();
  res.status(200).json({ message: "Admin updated successfully", adminExist });
};

export const deleteAdmin = async (req, res, next) => {
  const { id } = req.params;
  const adminExist = await adminModel.findById(id);
  if (!adminExist) {
    throw new Error("Admin not found", { cause: 404 });
  }
  await cloudinary.uploader.destroy(adminExist.image.public_id);
  await adminModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Admin deleted successfully" });
};