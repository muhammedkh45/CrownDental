import { Router } from "express";
import * as BS from "./billing.service.js";
import * as BV from "./billing.validation.js";
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../middleware/validation.js";
const billingRouter = Router();
billingRouter.post(
  "/add",
  validation(BV.addBillingSchema),
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.SUPER_ADMIN]),
  BS.addBilling
);
billingRouter.get(
  "/list/:id",
  validation(BV.getPatientBillsSchema),
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.SUPER_ADMIN]),
  BS.listPatientBills
);
billingRouter.put(
  "/update/:id",
  validation(BV.updateBillingSchema),
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.SUPER_ADMIN]),
  BS.updateBilling
);

export default billingRouter;
