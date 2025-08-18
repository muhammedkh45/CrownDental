import { Router } from "express";
import * as DC from "./doctor.service.js";
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { systemRoles } from "../../utils/systemRoles.js";
const doctorRouter = Router();
doctorRouter.post("/add", DC.AddNewDoctor);
doctorRouter.get(
  "/list",
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.SUPER_ADMIN]),
  DC.listDoctors
);
doctorRouter.put(
  "/update/:id",
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.DOCTOR,
  ]),
  DC.updateDoctor
);
doctorRouter.delete(
  "/delete/:id",
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.DOCTOR,
  ]),
  DC.deleteDoctor
);
export default doctorRouter;
