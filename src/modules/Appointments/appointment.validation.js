import Joi from "joi";
import { appointmentStatus } from "../../DB/models/Appointments/appointment.model.js";

export const reservationSchema = {
  body: Joi.object({
    patient: Joi.string().hex().length(24).required(),
    doctor: Joi.string().hex().length(24).required(),
    appointmentTime: Joi.date().required(),
    status: Joi.string()
      .valid(
        appointmentStatus.reserved,
        appointmentStatus.cancelled,
        appointmentStatus.done
      )
      .optional(),
  }),
};
export const updateReservationSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object({
    patient: Joi.string().hex().length(24).optional(),
    doctor: Joi.string().hex().length(24).optional(),
    appointmentTime: Joi.date().optional(),
    status: Joi.string().valid("pending", "approved", "canceled").optional(),
  }),
};
export const deleteReservationSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
export const getReservationStatusSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
