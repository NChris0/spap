const Joi = require("joi");

const createRoleSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),

  description: Joi.string().trim().allow("").optional(),

  permissions: Joi.array()
    .items(Joi.string().trim())
    .default([]),

  clubId: Joi.string().optional().allow(null, ""),
});

const updateRoleSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),

  description: Joi.string().trim().allow(""),

  permissions: Joi.array().items(Joi.string().trim()),

  clubId: Joi.string().allow(null, ""),
}).min(1);

module.exports = {
  createRoleSchema,
  updateRoleSchema,
};