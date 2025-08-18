import { Router } from "express";

const adminRouter = Router();
export default adminRouter;
import { systemRoles } from "../../utils/systemRoles.js";
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { MulterLocal } from "../../middleware/multer.js";
import { addAdmin, deleteAdmin, updateAdmin } from "./admin.service.js";

adminRouter.post(
  "/add",
  Authentication,
  authorization([systemRoles.SUPER_ADMIN]),
  MulterLocal("admin", /jpeg|jpg|png|gif/).single("image"),
  addAdmin
);
adminRouter.patch(
  "/update/:id",
  Authentication,
  authorization([systemRoles.SUPER_ADMIN]),
  MulterLocal("admin", /jpeg|jpg|png|gif/).single("image"),
  updateAdmin
);
adminRouter.delete(
  "/delete/:id",
  Authentication,
  authorization([systemRoles.SUPER_ADMIN]),
  deleteAdmin
);
