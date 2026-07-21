const express = require("express");
const router = express.Router();

const clubController = require("./club.controller");


// Create Club
router.post(
  "/",
  clubController.createClub
);


// Get All Clubs
router.get(
  "/",
  clubController.getAllClubs
);


// Get Single Club
router.get(
  "/:id",
  clubController.getClubById
);


// Update Club
router.put(
  "/:id",
  clubController.updateClub
);


// Delete Club
router.delete(
  "/:id",
  clubController.deleteClub
);


module.exports = router;