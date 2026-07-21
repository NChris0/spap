const Tenant = require("./tenant.model");


// Create Tenant
const createTenant = async (tenantData) => {
  const existingTenant = await Tenant.findOne({
    code: tenantData.code,
  });

  if (existingTenant) {
    throw new Error("Tenant code already exists");
  }

  const tenant = await Tenant.create(tenantData);

  return tenant;
};


// Get All Tenants
const getAllTenants = async () => {
  const tenants = await Tenant.find()
    .sort({ createdAt: -1 });

  return tenants;
};


// Get Tenant By ID
const getTenantById = async (tenantId) => {
  const tenant = await Tenant.findById(tenantId);

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  return tenant;
};


// Update Tenant
const updateTenant = async (
  tenantId,
  updateData
) => {

  const tenant = await Tenant.findByIdAndUpdate(
    tenantId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );


  if (!tenant) {
    throw new Error("Tenant not found");
  }


  return tenant;
};


// Delete Tenant
const deleteTenant = async (tenantId) => {

  const tenant = await Tenant.findByIdAndDelete(
    tenantId
  );


  if (!tenant) {
    throw new Error("Tenant not found");
  }


  return tenant;
};



module.exports = {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
};