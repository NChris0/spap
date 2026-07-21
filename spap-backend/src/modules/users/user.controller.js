const userService = require("./user.service");

const successResponse = require("../../shared/responses/success.response");

const {
  asyncHandler
} = require("../../shared/utils");

const {
  createUserSchema,
  updateUserSchema,
} = require("./user.validation");


// Create User
const createUser = asyncHandler(async (req, res) => {

  const { error } = createUserSchema.validate(req.body);

  if (error) {
    const err = new Error(
      error.details[0].message
    );

    err.statusCode = 400;

    throw err;
  }


  const user = await userService.createUser(req.body);


  return successResponse(
    res,
    "User created successfully",
    user,
    201
  );

});


// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {

  const users = await userService.getAllUsers();


  return successResponse(
    res,
    "Users fetched successfully",
    users
  );

});


// Get User By ID
const getUserById = asyncHandler(async (req, res) => {

  const user = await userService.getUserById(
    req.params.id
  );


  if (!user) {

    const error = new Error(
      "User not found"
    );

    error.statusCode = 404;

    throw error;
  }


  return successResponse(
    res,
    "User fetched successfully",
    user
  );

});


// Update User
const updateUser = asyncHandler(async (req, res) => {


  const { error } = updateUserSchema.validate(req.body);


  if (error) {

    const err = new Error(
      error.details[0].message
    );

    err.statusCode = 400;

    throw err;
  }


  const user = await userService.updateUser(
    req.params.id,
    req.body
  );


  if (!user) {

    const error = new Error(
      "User not found"
    );

    error.statusCode = 404;

    throw error;
  }


  return successResponse(
    res,
    "User updated successfully",
    user
  );

});


// Delete User
const deleteUser = asyncHandler(async (req, res) => {

  const user = await userService.deleteUser(
    req.params.id
  );


  if (!user) {

    const error = new Error(
      "User not found"
    );

    error.statusCode = 404;

    throw error;
  }


  return successResponse(
    res,
    "User deleted successfully",
    null
  );

});



module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};