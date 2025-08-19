import Joi from "joi";
import {
  paymentStatus,
  paymentMethods,
} from "../../DB/models/Billing/billing.model.js";
export const addBillingSchema = {
  body: Joi.object({
    patient: Joi.string().required(),
    appointment: Joi.string().required(),
    doctor: Joi.string().required(),
    items: Joi.array().items(
      Joi.object({
        description: Joi.string().required(),
        cost: Joi.number().required(),
        quantity: Joi.number().required(),
        total: Joi.number().required(),
      })
    ),
    totalAmount: Joi.number().required(),
    discount: Joi.number().default(0),
    netAmount: Joi.number().required(),
    paymentStatus: Joi.string()
      .valid(
        paymentStatus.cancelled,
        paymentStatus.partial,
        paymentStatus.paid,
        paymentStatus.pending
      )
      .default("Pending"),
    paymentMethod: Joi.string().valid(
      paymentMethods.cash,
      paymentMethods.credit_card,
      paymentMethods.debit_card,
      paymentMethods.insurance,
      paymentMethods.online
    ),
    billingDate: Joi.date().default(Date.now()),
  }),
};

export const updateBillingSchema = {
  body: Joi.object({
    patient: Joi.string(),
    appointment: Joi.string(),
    doctor: Joi.string(),
    items: Joi.array().items(
      Joi.object({
        description: Joi.string().required(),
        cost: Joi.number().required(),
        quantity: Joi.number().required(),
        total: Joi.number().required(),
      })
    ),
    totalAmount: Joi.number(),
    discount: Joi.number().default(0),
    netAmount: Joi.number(),
    paymentStatus: Joi.string().valid(
      paymentStatus.cancelled,
      paymentStatus.partial,
      paymentStatus.paid,
      paymentStatus.pending
    ),
    paymentMethod: Joi.string().valid(
      paymentMethods.cash,
      paymentMethods.credit_card,
      paymentMethods.debit_card,
      paymentMethods.insurance,
      paymentMethods.online
    ),
    billingDate: Joi.date(),
  }),
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
export const getPatientBillsSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
