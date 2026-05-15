const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
  });
};

export default errorMiddleware;