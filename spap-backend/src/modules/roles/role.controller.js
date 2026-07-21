const roleService = require("./role.service");

const {
  createRoleSchema,
  updateRoleSchema,
} = require("./role.validation");

const successResponse = require("../../shared/responses/success.response");

const {
  asyncHandler,
} = require("../../shared/utils");


// Create Role
const createRole = asyncHandler(async (req, res) => {

  const { error } = createRoleSchema.validate(req.body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }


  const role = await roleService.createRole(req.body);


  return successResponse(
    res,
    "Role created successfully",
    role,
    201
  );

});



// Get All Roles
const getRoles = asyncHandler(async (req, res) => {

  const roles = await roleService.getRoles();


  return successResponse(
    res,
    "Roles fetched successfully",
    roles
  );

});



// Get Role By ID
const getRoleById = asyncHandler(async (req, res) => {

  const role = await roleService.getRoleById(
    req.params.id
  );


  if (!role) {

    const err = new Error(
      "Role not found"
    );

    err.statusCode = 404;

    throw err;
  }


  return successResponse(
    res,
    "Role fetched successfully",
    role
  );

});



// Update Role
const updateRole = asyncHandler(async (req, res) => {

  const { error } = updateRoleSchema.validate(req.body);


  if (error) {

    const err = new Error(
      error.details[0].message
    );

    err.statusCode = 400;

    throw err;
  }


  const role = await roleService.updateRole(
    req.params.id,
    req.body
  );


  if (!role) {

    const err = new Error(
      "Role not found"
    );

    err.statusCode = 404;

    throw err;
  }


  return successResponse(
    res,
    "Role updated successfully",
    role
  );

});



// Delete Role
const deleteRole = asyncHandler(async (req, res) => {

  const role = await roleService.deleteRole(
    req.params.id
  );


  if (!role) {

    const err = new Error(
      "Role not found"
    );

    err.statusCode = 404;

    throw err;
  }


  return successResponse(
    res,
    "Role deleted successfully",
    null
  );

});



module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};