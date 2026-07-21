const express = require("express");

const router = express.Router();


const tenantController =
require("./tenant.controller");



// Create Tenant
router.post(
  "/",
  tenantController.createTenant
);


// Get All Tenants
router.get(
  "/",
  tenantController.getAllTenants
);


// Get Tenant By ID
router.get(
  "/:id",
  tenantController.getTenantById
);


// Update Tenant
router.put(
  "/:id",
  tenantController.updateTenant
);


// Delete Tenant
router.delete(
  "/:id",
  tenantController.deleteTenant
);



module.exports = router;