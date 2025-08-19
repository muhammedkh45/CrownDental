import { patientModel } from "../DB/models/Patients/patient.model.js";
import { doctorModel } from "../DB/models/Doctors/doctor.model.js";

import { verifyToken } from "../utils/token/verifyToken.js";
import { adminModel } from "../DB/models/Admins/admin.model.js";

export const Authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error("Authorization header missing", { cause: 401 });
    }
    const [prefix, token] = authorization.split(" ");

    if (!prefix || !token) {
      throw new Error("Token not exist.", { cause: 401 });
    }

    let Signature;
    let userModelToUse;

    switch (prefix.toLowerCase()) {
      case "patient":
        Signature = process.env.JWT_PATIENT_SECRET;
        userModelToUse = patientModel;
        break;
      case "admin":
        Signature = process.env.JWT_ADMIN_SECRET;
        userModelToUse = adminModel;
        break;
      case "doctor":
        Signature = process.env.JWT_DOCTOR_SECRET;
        userModelToUse = doctorModel;
        break;
      default:
        throw new Error("Invalid token prefix", { cause: 401 });
    }

    const decoded = await verifyToken({
      payload: token,
      Signature: Signature,
    });

    // const revoked = await revokeTokenModel.findOne({ tokenId: decoded.jti });
    // if (revoked) {
    //   throw new Error("User not logged in", { cause: 401 });
    // }

    const user = await userModelToUse.findById(decoded.id);
    if (!user) {
      throw new Error("User not found", { cause: 404 });
    }

    req.user = user;
    req.decoded = decoded;
    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token", { cause: 401 });
    } else if (error.name === "TokenExpiredError") {
      throw new Error("Token expired", { cause: 401 });
    } else {
      throw new Error(error.message, { cause: error.cause });
    }
  }
};
