import { Router } from "express";
import * as BS from "./billing.service.js"
const billingRouter = Router();
billingRouter.post("/add",BS.addBilling)
billingRouter.get("/list",BS.listPatientBills)
billingRouter.put("/update",BS.updateBilling)

export default billingRouter;
