import ConnectionDB from "./DB/connectionDB.js";
import golbalErrorHandler from "./middleware/globalErrorHandler.js";
import patientRouter from "./modules/Patients/patient.controller.js";
const bootstrap = (app, express) => {
  app.use(express.json());
  ConnectionDB();
  app.use("/patient", patientRouter);
  app.use("{/*demo}", (req, res, next) => {
    throw new Error(`Page not found on the url :${req.originalUrl}`);
  });
  app.use(golbalErrorHandler);
};
export default bootstrap;
