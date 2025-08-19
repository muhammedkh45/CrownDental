import { Router } from "express";
import * as AS from "./appointment.service.js";
import * as AV from "./appointment.validation.js";
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../middleware/validation.js";
const appointmentRouter = Router();
appointmentRouter.post(
  "/reserve",
  validation(AV.reservationSchema),
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.PATIENT,
  ]),
  AS.reserveAppointment
);
appointmentRouter.get(
  "/list",
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.PATIENT,
  ]),
  AS.listReservations
);
appointmentRouter.put(
  "/update/:id",
  validation(AV.updateReservationSchema),
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.PATIENT,
  ]),
  AS.updateReservation
);
appointmentRouter.delete(
  "/delete/:id",
  validation(AV.deleteReservationSchema),
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.PATIENT,
  ]),
  AS.deleteReservation
);
appointmentRouter.get(
  "/reservationStatus/:id",
  validation(AV.getReservationStatusSchema),
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.PATIENT]),
  AS.ReservationStatus
);

export default appointmentRouter;
