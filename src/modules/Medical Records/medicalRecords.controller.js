import { Router } from "express";
import * as MRS from "./medicalRecords.service.js";
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { systemRoles } from "../../utils/systemRoles.js";
const medicalRecordsRouter = Router();
medicalRecordsRouter.post(
  "/add",
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.DOCTOR,
  ]),
  MRS.addMedicalNotes
);
export default medicalRecordsRouter;
