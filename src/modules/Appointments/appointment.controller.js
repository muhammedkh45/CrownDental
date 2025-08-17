import { Router } from "express";
import * as AS from "./appointment.service.js"
const appointmentRouter = Router();
appointmentRouter.post("/reserve",AS.reserveAppointment)
appointmentRouter.get("/list",AS.listReservations)
appointmentRouter.put("/update",AS.updateReservation)
appointmentRouter.delete("/delete",AS.deleteReservation)
appointmentRouter.geet("/reservationStatus",AS.ReservationStatus)

export default appointmentRouter;