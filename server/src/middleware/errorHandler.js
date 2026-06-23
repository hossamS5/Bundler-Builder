/**
 * Centralized error handler. Must keep the 4-arg signature for Express to
 * recognize it as error-handling middleware.
 */
export function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    error: {
      message: err.message || "Internal server error",
    },
  });
}
