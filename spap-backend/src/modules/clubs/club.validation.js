const Joi = require("joi");


const createClubValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  shortName: Joi.string()
    .max(20)
    .optional(),

  country: Joi.string()
    .required(),

  city: Joi.string()
    .optional(),

  logo: Joi.string()
    .optional(),

  status: Joi.string()
    .valid("active", "inactive")
    .optional(),
});


module.exports = {
  createClubValidation,
};