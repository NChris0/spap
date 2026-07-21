const clubService = require("./club.service");


// Create Club
const createClub = async (req, res) => {
  try {
    const club = await clubService.createClub(req.body);

    res.status(201).json({
      success: true,
      message: "Club created successfully",
      data: club,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Clubs
const getAllClubs = async (req, res) => {
  try {
    const clubs = await clubService.getAllClubs();

    res.status(200).json({
      success: true,
      data: clubs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get One Club
const getClubById = async (req, res) => {
  try {
    const club = await clubService.getClubById(req.params.id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    res.status(200).json({
      success: true,
      data: club,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Club
const updateClub = async (req, res) => {
  try {
    const club = await clubService.updateClub(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Club updated successfully",
      data: club,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Club
const deleteClub = async (req, res) => {
  try {
    await clubService.deleteClub(req.params.id);

    res.status(200).json({
      success: true,
      message: "Club deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
};