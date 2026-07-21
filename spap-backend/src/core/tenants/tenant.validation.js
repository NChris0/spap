const Joi = require("joi");


const createTenantSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required(),

  code: Joi.string()
    .min(3)
    .max(20)
    .uppercase()
    .required(),

  type: Joi.string()
    .valid(
      "SPORTS",
      "SCHOOL",
      "HOSPITAL",
      "COMPANY",
      "INDUSTRY"
    )
    .required(),

  country: Joi.string()
    .required(),

  city: Joi.string()
    .optional(),

  logo: Joi.string()
    .optional(),

});


const updateTenantSchema = Joi.object({

  name: Joi.string()
    .min(2)
    .max(100)
    .optional(),

  code: Joi.string()
    .min(3)
    .max(20)
    .uppercase()
    .optional(),

  type: Joi.string()
    .valid(
      "SPORTS",
      "SCHOOL",
      "HOSPITAL",
      "COMPANY",
      "INDUSTRY"
    )
    .optional(),

  status: Joi.string()
    .valid(
      "ACTIVE",
      "INACTIVE",
      "SUSPENDED"
    )
    .optional(),

  country: Joi.string()
    .optional(),

  city: Joi.string()
    .optional(),

  logo: Joi.string()
    .optional(),

});


module.exports = {
  createTenantSchema,
  updateTenantSchema,
};