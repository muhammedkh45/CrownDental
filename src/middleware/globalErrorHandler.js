const golbalErrorHandler = (err, req, res, next) => {
  res.status(err.cause || 500).json({
    message: err.message || "Error occured",
    stack: err.stack,
    error: err,
  });
};
export default golbalErrorHandler;
