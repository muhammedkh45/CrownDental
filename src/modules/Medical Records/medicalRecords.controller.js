import { Router } from "express";
import * as MRS from "./medicalRecords.service.js";
import * as MRV from "./medicalRecords.validation.js";
import {validation} from "../../middleware/validation.js"
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { systemRoles } from "../../utils/systemRoles.js";
const medicalRecordsRouter = Router();
medicalRecordsRouter.post(
  "/add",
  validation(MRV.addMedicalRecordSchema),
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.DOCTOR,
  ]),
  MRS.addMedicalNotes
);
medicalRecordsRouter.patch(
  "/update/:id",
  validation(MRV.updateMedicalRecordSchema),
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.DOCTOR,
  ]),
  MRS.updateMedicalNote
);
export default medicalRecordsRouter;
