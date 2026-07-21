const Joi = require("joi");


// Create User Validation
const createUserSchema = Joi.object({

  firstName: Joi.string()
    .min(2)
    .max(50)
    .required(),

  lastName: Joi.string()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  phone: Joi.string()
    .optional(),

  password: Joi.string()
    .min(6)
    .required(),

  role: Joi.string()
    .required(),

  club: Joi.string()
    .optional(),

});


// Update User Validation
const updateUserSchema = Joi.object({

  firstName: Joi.string()
    .min(2)
    .max(50),

  lastName: Joi.string()
    .min(2)
    .max(50),

  email: Joi.string()
    .email(),

  phone: Joi.string(),

  role: Joi.string(),

  club: Joi.string(),

  status: Joi.string()
    .valid(
      "ACTIVE",
      "INACTIVE",
      "SUSPENDED",
      "PENDING"
    ),

});


module.exports = {
  createUserSchema,
  updateUserSchema,
};