// =============================================
// Users Module
// Public exports
// =============================================

const User = require("./user.model");
const userService = require("./user.service");
const userController = require("./user.controller");
const userValidation = require("./user.validation");
const userRoutes = require("./user.route");

module.exports = {
    User,
    userService,
    userController,
    userValidation,
    userRoutes,
};