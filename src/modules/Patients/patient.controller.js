import { Router } from "express";
import * as PC from "./patient.service.js";
const patientRouter = Router();
patientRouter.post("/add",PC.AddNewPatient);
patientRouter.get("/list",PC.listPatients);
patientRouter.patch("/update/:id",PC.updatePatient);
patientRouter.delete("/delete/:id",PC.deletePatient);
export default patientRouter;
