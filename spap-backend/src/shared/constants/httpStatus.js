const HTTP_STATUS = {
  // ======================
  // SUCCESS
  // ======================
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // ======================
  // CLIENT ERRORS
  // ======================
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // ======================
  // SERVER ERRORS
  // ======================
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = HTTP_STATUS;