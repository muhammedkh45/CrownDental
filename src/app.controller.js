import ConnectionDB from "./DB/connectionDB.js";
import golbalErrorHandler from "./middleware/globalErrorHandler.js";
import appointmentRouter from "./modules/Appointments/appointment.controller.js";
import billingRouter from "./modules/Billing/billing.controller.js";
import doctorRouter from "./modules/Doctors/doctor.controller.js";
import medicalRecordsRouter from "./modules/Medical Records/medicalRecords.controller.js";
import patientRouter from "./modules/Patients/patient.controller.js";

const bootstrap = (app, express) => {
  app.use(express.json());
  ConnectionDB();
  app.use("/doctor", doctorRouter);
  app.use("/patient", patientRouter);
  app.use("/appointment", appointmentRouter);
  app.use("/billing", billingRouter);
  app.use("/medical-record", medicalRecordsRouter);
  app.use("{/*demo}", (req, res, next) => {
    throw new Error(`Page not found on the url :${req.originalUrl}`);
  });
  app.use(golbalErrorHandler);
};
export default bootstrap;
