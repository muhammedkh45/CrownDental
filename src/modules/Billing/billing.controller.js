import { Router } from "express";
import * as BS from "./billing.service.js";
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { systemRoles } from "../../utils/systemRoles.js";
const billingRouter = Router();
billingRouter.post(
  "/add",
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.SUPER_ADMIN]),
  BS.addBilling
);
billingRouter.get(
  "/list",
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.SUPER_ADMIN]),
  BS.listPatientBills
);
billingRouter.put(
  "/update",
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.SUPER_ADMIN]),
  BS.updateBilling
);

export default billingRouter;
