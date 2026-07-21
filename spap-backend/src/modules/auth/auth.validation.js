const Joi = require("joi");
const mongoose = require("mongoose");

const {
  REGEX
} = require("../../shared/constants");



// ===============================
// Validate MongoDB ObjectId
// ===============================
const objectId = (value, helpers) => {

  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ObjectId");
  }

  return value;
};




// ===============================
// Register Validation
// ===============================
const registerSchema = Joi.object({

  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.min": "First name must contain at least 2 characters",
      "any.required": "First name is required"
    }),



  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must contain at least 2 characters",
      "any.required": "Last name is required"
    }),




  email: Joi.string()
    .trim()
    .lowercase()
    .pattern(REGEX.EMAIL_PATTERN)
    .required()
    .messages({

      "string.pattern.base":
      "Please provide a valid email",

      "any.required":
      "Email is required"

    }),





  phone: Joi.string()
    .trim()
    .pattern(REGEX.PHONE_PATTERN)
    .allow("", null)
    .messages({

      "string.pattern.base":
      "Phone number must be in international format"

    }),






  password: Joi.string()
    .min(8)
    .required()
    .messages({

      "string.min":
      "Password must contain at least 8 characters",

      "any.required":
      "Password is required"

    }),





  role: Joi.string()
    .custom(objectId)
    .required()
    .messages({

      "any.required":
      "Role is required"

    }),






  club: Joi.string()
    .custom(objectId)
    .allow(null, "")
    .messages({

      "string.base":
      "Club must be a valid ID"

    })



},{

  abortEarly:false

});







// ===============================
// Login Validation
// ===============================
const loginSchema = Joi.object({


  email: Joi.string()
    .trim()
    .lowercase()
    .pattern(REGEX.EMAIL_PATTERN)
    .required()
    .messages({

      "string.pattern.base":
      "Please provide a valid email",

      "any.required":
      "Email is required"

    }),





  password: Joi.string()
    .required()
    .messages({

      "any.required":
      "Password is required"

    })



},{

 abortEarly:false

});









// ===============================
// Change Password Validation
// ===============================
const changePasswordSchema = Joi.object({


  currentPassword: Joi.string()
    .required()
    .messages({

      "any.required":
      "Current password is required"

    }),





  newPassword: Joi.string()
    .min(8)
    .required()
    .messages({

      "string.min":
      "New password must contain at least 8 characters",

      "any.required":
      "New password is required"

    })



},{

 abortEarly:false

});








// ===============================
// Refresh Token Validation
// ===============================
const refreshTokenSchema = Joi.object({


  refreshToken: Joi.string()
    .required()
    .messages({

      "any.required":
      "Refresh token is required"

    })


},{

 abortEarly:false

});








// ===============================
// Logout Validation
// ===============================
const logoutSchema = Joi.object({


  refreshToken: Joi.string()
    .required()
    .messages({

      "any.required":
      "Refresh token is required"

    })


},{

 abortEarly:false

});








module.exports = {

  registerSchema,

  loginSchema,

  changePasswordSchema,

  refreshTokenSchema,

  logoutSchema

};