const express = require("express");

const clubRoutes = require("../modules/clubs/club.route");
const roleRoutes = require("../modules/roles/role.route");
const userRoutes = require("../modules/users/user.route");
const authRoutes = require("../modules/auth/auth.route");

const router = express.Router();

router.use("/clubs", clubRoutes);
router.use("/roles", roleRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;