const {
  HTTP_STATUS
} = require("../shared/constants");



// ===============================
// Global Error Middleware
// ===============================
const errorMiddleware = (
  error,
  req,
  res,
  next
) => {


  let statusCode =
    error.statusCode ||
    HTTP_STATUS.INTERNAL_SERVER_ERROR;



  let message =
    error.message ||
    "Internal server error";



  let errors = null;



  // ===============================
  // MongoDB Duplicate Key Error
  // ===============================
  if (error.code === 11000) {

    statusCode =
      HTTP_STATUS.BAD_REQUEST;


    const field =
      Object.keys(error.keyValue)[0];


    message =
      `${field} already exists`;

  }





  // ===============================
  // Mongoose Validation Error
  // ===============================
  if (
    error.name === "ValidationError"
  ) {


    statusCode =
      HTTP_STATUS.BAD_REQUEST;


    errors =
      Object.values(error.errors)
      .map((item)=>({

        field:item.path,

        message:item.message

      }));


    message =
      "Validation failed";

  }





  // ===============================
  // Mongoose Cast Error
  // ===============================
  if (
    error.name === "CastError"
  ) {


    statusCode =
      HTTP_STATUS.BAD_REQUEST;


    message =
      "Invalid resource ID";

  }





  return res
    .status(statusCode)
    .json({

      success:false,

      message,

      ...(errors && { errors })

    });


};



module.exports = {
  errorMiddleware
};