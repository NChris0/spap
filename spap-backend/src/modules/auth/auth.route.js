const express = require("express");

const authController = require("./auth.controller");

const validate = require("../../middlewares/validation.middleware");

const {
  registerSchema,
  loginSchema
} = require("./auth.validation");


const router = express.Router();



router.post(
 "/register",
 validate(registerSchema),
 authController.register
);



router.post(
 "/login",
 validate(loginSchema),
 authController.login
);



router.post(
 "/refresh-token",
 authController.refreshToken
);



router.post(
 "/logout",
 authController.logout
);



module.exports = router;