const Role = require("./role.model");

// Create Role
const createRole = async (roleData) => {
  const existingRole = await Role.findOne({
    name: roleData.name,
    clubId: roleData.clubId || null,
  });

  if (existingRole) {
    throw new Error("Role already exists");
  }

  const role = await Role.create(roleData);
  return role;
};

// Get All Roles
const getRoles = async (filter = {}) => {
  return await Role.find(filter).sort({ createdAt: -1 });
};

// Get Role By ID
const getRoleById = async (id) => {
  return await Role.findById(id);
};

// Update Role
const updateRole = async (id, updateData) => {
  const role = await Role.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return role;
};

// Delete Role
const deleteRole = async (id) => {
  return await Role.findByIdAndDelete(id);
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};