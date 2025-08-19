import { Router } from "express";
import { systemRoles } from "../../utils/systemRoles.js";
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { MulterLocal } from "../../middleware/multer.js";
import * as AS from "./admin.service.js";
import * as AV from "./admin.validation.js";
import { validation } from "../../middleware/validation.js";
const adminRouter = Router();
adminRouter.post(
  "/add",
  MulterLocal("admin", /\.(jpeg|jpg|png|gif|txt)$/i).single("image"),
  validation(AV.addAdminSchema),
  Authentication,
  authorization([systemRoles.SUPER_ADMIN, systemRoles.ADMIN]),
  AS.signUpAdmin
);
adminRouter.post("/login", validation(AV.loginSchema), AS.login);

adminRouter.patch(
  "/update/:id",
  validation(AV.updateAdminSchema),
  Authentication,
  authorization([systemRoles.SUPER_ADMIN, systemRoles.ADMIN]),
  MulterLocal("admin", /jpeg|jpg|png|gif/).single("image"),
  AS.updateAdmin
);
adminRouter.delete(
  "/delete/:id",
  validation(AV.deleteAdminSchema),
  Authentication,
  authorization([systemRoles.SUPER_ADMIN, systemRoles.ADMIN]),
  AS.deleteAdmin
);

export default adminRouter;
