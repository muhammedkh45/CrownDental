export const validation = (schema) => {
  return (req, res, next) => {
    try {
      let validationErrors = [];
      for (const key of Object.keys(schema)) {
        if (!schema[key] || typeof schema[key].validate !== "function") {
          throw new Error(`Invalid schema for ${key}`);
        }
        const data = schema[key].validate(req[key], { abortEarly: false });
        if (data?.error) {
          validationErrors.push(data?.error?.details);
        }
      }
      if (validationErrors.length) {
        return res
          .status(400)
          .json({ message: "Validation error", errors: validationErrors });
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
};
