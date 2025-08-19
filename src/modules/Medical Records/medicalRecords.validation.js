import Joi from "joi";

export const addMedicalRecordSchema = {
  body: Joi.object({
    patient: Joi.string().hex().length(24).required(),
    doctor: Joi.string().hex().length(24).required(),
    appointment: Joi.string().hex().length(24).required(),
    diagnosis: Joi.string().required(),
    symptoms: Joi.array().items(Joi.string()).optional(),
    prescriptions: Joi.array().items(
      Joi.object({
        medicineName: Joi.string().required(),
        dosage: Joi.string().required(),
        frequency: Joi.string().required(),
        duration: Joi.string().optional(),
        notes: Joi.string().optional(),
      })
    ).optional(),
    labTests: Joi.array().items(
      Joi.object({
        testName: Joi.string().required(),
        result: Joi.string().optional(),
        date: Joi.date().optional(),
      })
    ).optional(),
    allergies: Joi.array().items(Joi.string()).optional(),
    pastMedicalHistory: Joi.array().items(Joi.string()).optional(),
    notes: Joi.string().optional(),
    recordDate: Joi.date().optional(),
  }),
};

export const updateMedicalRecordSchema = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object({
    diagnosis: Joi.string().optional(),
    symptoms: Joi.array().items(Joi.string()).optional(),
    prescriptions: Joi.array().items(
      Joi.object({
        medicineName: Joi.string().required(),
        dosage: Joi.string().required(),
        frequency: Joi.string().required(),
        duration: Joi.string().optional(),
        notes: Joi.string().optional(),
      })
    ).optional(),
    labTests: Joi.array().items(
      Joi.object({
        testName: Joi.string().required(),
        result: Joi.string().optional(),
        date: Joi.date().optional(),
      })
    ).optional(),
    allergies: Joi.array().items(Joi.string()).optional(),
    pastMedicalHistory: Joi.array().items(Joi.string()).optional(),
    notes: Joi.string().optional(),
    recordDate: Joi.date().optional(),
  })
}
