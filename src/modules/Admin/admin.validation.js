import Joi from "joi";

export const addAdminSchema = {
  body: Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    cPassword: Joi.string().valid(Joi.ref("password")).required(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    role: Joi.string().valid("admin", "super_admin").optional(),
  }),
};

export const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const updateAdminSchema = {
  body: Joi.object({
    userName: Joi.string().min(3).max(20).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    role: Joi.string().valid("admin", "super_admin").optional(),
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const deleteAdminSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
