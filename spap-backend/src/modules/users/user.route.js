// =============================================
// User Routes
// =============================================

const express = require("express");

const controller = require("./user.controller");
const validation = require("./user.validation");

const router = express.Router();

// =============================================
// User Routes
// =============================================

router.post(
    "/",
    validation.createUser,
    controller.createUser
);

router.get(
    "/",
    controller.getUsers
);

router.get(
    "/:id",
    validation.getUserById,
    controller.getUserById
);

router.put(
    "/:id",
    validation.updateUser,
    controller.updateUser
);

router.patch(
    "/:id/status",
    validation.updateUserStatus,
    controller.updateUserStatus
);

router.patch(
    "/:id/verify",
    validation.verifyUser,
    controller.verifyUser
);

router.delete(
    "/:id",
    validation.deleteUser,
    controller.deleteUser
);

module.exports = router;