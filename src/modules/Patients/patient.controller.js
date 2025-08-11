import { Router } from "express";
import * as PC from "./patient.service.js";
const patientRouter = Router();
patientRouter.post("/add",PC.AddNewPatient);
export default patientRouter;
