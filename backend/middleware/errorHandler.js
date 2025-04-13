exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Terjadi kesalahan di server";

  res.status(statusCode).json({
    status: "error",
    message,
  });
};
