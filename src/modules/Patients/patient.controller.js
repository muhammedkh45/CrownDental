import { Router } from "express";
import * as PS from "./patient.service.js";
import * as PV from "./patient.validation.js";
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { systemRoles } from "../../utils/systemRoles.js";
import {validation} from "../../middleware/validation.js"
const patientRouter = Router();
patientRouter.post("/signup",validation(PV.signUpSchema), PS.signUpPatient);
patientRouter.post("/login", validation(PV.lognInSchema), PS.loginPatient);
patientRouter.get(
  "/list",
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.SUPER_ADMIN]),
  PS.listPatients
);
patientRouter.patch(
  "/update/:id",validation(PV.updatePatientSchema),
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.PATIENT,
  ]),
  PS.updatePatient
);
patientRouter.delete(
  "/delete/:id",validation(PV.deletePatientSchema),
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
  ]),
  PS.deletePatient
);
export default patientRouter;
