import { Router } from "express";
import * as PS from "./patient.service.js";
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { systemRoles } from "../../utils/systemRoles.js";
const patientRouter = Router();
patientRouter.post("/add", PS.AddNewPatient);
patientRouter.get(
  "/list",
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.SUPER_ADMIN]),
  PS.listPatients
);
patientRouter.patch(
  "/update/:id",
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.PATIENT,
  ]),
  PS.updatePatient
);
patientRouter.delete(
  "/delete/:id",
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.PATIENT,
  ]),
  PS.deletePatient
);
export default patientRouter;
