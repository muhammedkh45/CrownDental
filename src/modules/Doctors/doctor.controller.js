import { Router } from "express";
import * as DC from "./doctor.service.js";
const doctorRouter = Router();
doctorRouter.post("/add", DC.AddNewDoctor);
doctorRouter.get("/list", DC.listDoctors);
doctorRouter.put("/update", DC.updateDoctor);
doctorRouter.delete("/delete", DC.deleteDoctor);
export default doctorRouter;
