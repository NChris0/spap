const Club = require("./club.model");


// Create Club
const createClub = async (clubData) => {
  const club = await Club.create(clubData);

  return club;
};


// Get All Clubs
const getAllClubs = async () => {
  const clubs = await Club.find();

  return clubs;
};


// Get Single Club
const getClubById = async (clubId) => {
  const club = await Club.findById(clubId);

  return club;
};


// Update Club
const updateClub = async (clubId, updateData) => {
  const club = await Club.findByIdAndUpdate(
    clubId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  return club;
};


// Delete Club
const deleteClub = async (clubId) => {
  const club = await Club.findByIdAndDelete(clubId);

  return club;
};


module.exports = {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
};