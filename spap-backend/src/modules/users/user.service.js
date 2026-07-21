const User = require("./user.model");


// Create User
const createUser = async (data) => {
  return await User.create(data);
};


// Get all users
const getAllUsers = async (filter = {}) => {
  return await User.find(filter)
    .populate("role")
    .populate("club");
};


// Get user by ID
const getUserById = async (id) => {
  return await User.findById(id)
    .populate("role")
    .populate("club");
};


// Get user by email
const getUserByEmail = async (email) => {
  return await User.findOne({ email })
    .select("+password")
    .populate("role")
    .populate("club");
};


// Update User
const updateUser = async (id, data) => {

  return await User.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  )
  .populate("role")
  .populate("club");

};


// Delete User
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};



module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};