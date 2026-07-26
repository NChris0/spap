// =============================================
// User Validation
// Joi validation schemas for user module
// =============================================

const Joi = require("joi");

const validate = require("../../shared/middlewares/validation.middleware");

const regex = require("../../shared/constants/regex");
const { STATUS } = require("../../shared/constants");

// =============================================
// Create User
// =============================================

const createUser = validate({
    body: Joi.object({
        firstName: Joi.string()
            .trim()
            .min(2)
            .max(100)
            .required(),

        lastName: Joi.string()
            .trim()
            .min(2)
            .max(100)
            .required(),

        email: Joi.string()
            .trim()
            .email()
            .required(),

        phone: Joi.string()
            .trim()
            .allow(null, ""),

        password: Joi.string()
            .pattern(regex.password)
            .required(),

        role: Joi.string()
            .pattern(regex.objectId)
            .required(),

        club: Joi.string()
            .pattern(regex.objectId)
            .allow(null, ""),
    }),
});

// =============================================
// Update User
// =============================================

const updateUser = validate({
    params: Joi.object({
        id: Joi.string()
            .pattern(regex.objectId)
            .required(),
    }),

    body: Joi.object({
        firstName: Joi.string()
            .trim()
            .min(2)
            .max(100),

        lastName: Joi.string()
            .trim()
            .min(2)
            .max(100),

        phone: Joi.string()
            .trim()
            .allow(null, ""),

        role: Joi.string()
            .pattern(regex.objectId),

        club: Joi.string()
            .pattern(regex.objectId)
            .allow(null, ""),
    }).min(1),
});

// =============================================
// Get User By ID
// =============================================

const getUserById = validate({
    params: Joi.object({
        id: Joi.string()
            .pattern(regex.objectId)
            .required(),
    }),
});

// =============================================
// Update User Status
// =============================================

const updateUserStatus = validate({
    params: Joi.object({
        id: Joi.string()
            .pattern(regex.objectId)
            .required(),
    }),

    body: Joi.object({
        status: Joi.string()
            .valid(...Object.values(STATUS))
            .required(),
    }),
});

// =============================================
// Delete User
// =============================================

const deleteUser = validate({
    params: Joi.object({
        id: Joi.string()
            .pattern(regex.objectId)
            .required(),
    }),
});

// =============================================
// Verify User
// =============================================

const verifyUser = validate({
    params: Joi.object({
        id: Joi.string()
            .pattern(regex.objectId)
            .required(),
    }),
});

// =============================================
// Exports
// =============================================

module.exports = {
    createUser,
    updateUser,
    getUserById,
    updateUserStatus,
    deleteUser,
    verifyUser,
};