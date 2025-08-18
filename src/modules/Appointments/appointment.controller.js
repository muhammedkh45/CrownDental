import { Router } from "express";
import * as AS from "./appointment.service.js";
import { Authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { systemRoles } from "../../utils/systemRoles.js";
const appointmentRouter = Router();
appointmentRouter.post(
  "/reserve",
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
  "/update",
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.PATIENT,
  ]),
  AS.updateReservation
);
appointmentRouter.delete(
  "/delete",
  Authentication,
  authorization([
    systemRoles.ADMIN,
    systemRoles.SUPER_ADMIN,
    systemRoles.PATIENT,
  ]),
  AS.deleteReservation
);
appointmentRouter.geet(
  "/reservationStatus",
  Authentication,
  authorization([systemRoles.ADMIN, systemRoles.PATIENT]),
  AS.ReservationStatus
);

export default appointmentRouter;
