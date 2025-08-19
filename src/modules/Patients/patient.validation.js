import Joi from "joi";

export const signUpSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    cPassword: Joi.string().valid(Joi.ref("password")).required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    dob: Joi.date().optional(),
    exMedicalStatus: Joi.array().items(Joi.string()).optional(),
    gender: Joi.string().valid("male", "female").required(),
    doctor_id: Joi.string().hex().length(24).required(),
  }),
};
export const lognInSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};



export const updatePatientSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(20).optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    dob: Joi.date().optional(),
    exMedicalStatus: Joi.array().items(Joi.string()).optional(),
    gender: Joi.string().valid("male", "female").optional(),
    doctor_id: Joi.string().hex().length(24).optional(),
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const deletePatientSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const getPatientByIdSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
