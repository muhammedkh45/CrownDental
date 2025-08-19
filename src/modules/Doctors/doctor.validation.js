import Joi from "joi";

export const signUpSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    cPassword: Joi.string().valid(Joi.ref("password")).required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    gender: Joi.string().valid("male", "female").required(),
    dob: Joi.date().optional(),
    specialization: Joi.string().required(),
  }),
};

export const updateDoctorSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(20).optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    gender: Joi.string().valid("male", "female").optional(),
    dob: Joi.date().optional(),
    specialization: Joi.string().optional(),
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
export const loginSchema = {
  body: Joi.object({
    ssn: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const deleteDoctorSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const getDoctorByIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
