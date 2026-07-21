const {
  HTTP_STATUS
} = require("../constants");




// ===============================
// Success Response
// ===============================
const successResponse = (
  res,
  statusCode = HTTP_STATUS.OK,
  message = "Success",
  data = null
) => {


  return res
    .status(statusCode)
    .json({

      success: true,

      message,

      data

    });

};





// ===============================
// Error Response
// ===============================
const errorResponse = (
  res,
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  message = "Something went wrong",
  errors = null
) => {


  return res
    .status(statusCode)
    .json({

      success: false,

      message,

      ...(errors && { errors })

    });

};





module.exports = {
  successResponse,
  errorResponse
};