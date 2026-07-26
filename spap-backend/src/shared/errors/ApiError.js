// ===============================
// Api Error
// Custom Application Error
// ===============================

class ApiError extends Error {
  constructor(
    statusCode,
    message,
    errorCode = null,
    details = null
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(
      this,
      this.constructor
    );
  }
}

module.exports = ApiError;