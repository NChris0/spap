const tenantService = require("./tenant.service");

const {
  createTenantSchema,
  updateTenantSchema,
} = require("./tenant.validation");


// Create Tenant
const createTenant = async (req, res, next) => {

  try {

    const { error } =
      createTenantSchema.validate(req.body);


    if (error) {
      return res.status(400).json({
        success:false,
        message:"Validation failed",
        error:error.details[0].message,
      });
    }


    const tenant =
      await tenantService.createTenant(req.body);


    res.status(201).json({
      success:true,
      message:"Tenant created successfully",
      data:tenant,
    });


  } catch(error){

    next(error);

  }

};



// Get All Tenants
const getAllTenants = async (
  req,
  res,
  next
) => {

  try {

    const tenants =
      await tenantService.getAllTenants();


    res.status(200).json({
      success:true,
      message:"Tenants fetched successfully",
      data:tenants,
    });


  } catch(error){

    next(error);

  }

};




// Get Tenant By ID
const getTenantById = async (
  req,
  res,
  next
) => {

  try {

    const tenant =
      await tenantService.getTenantById(
        req.params.id
      );


    res.status(200).json({
      success:true,
      message:"Tenant fetched successfully",
      data:tenant,
    });


  } catch(error){

    next(error);

  }

};




// Update Tenant
const updateTenant = async (
  req,
  res,
  next
) => {

  try {


    const { error } =
      updateTenantSchema.validate(req.body);


    if(error){

      return res.status(400).json({
        success:false,
        message:"Validation failed",
        error:error.details[0].message,
      });

    }



    const tenant =
      await tenantService.updateTenant(
        req.params.id,
        req.body
      );



    res.status(200).json({
      success:true,
      message:"Tenant updated successfully",
      data:tenant,
    });



  } catch(error){

    next(error);

  }

};



// Delete Tenant
const deleteTenant = async (
  req,
  res,
  next
)=>{

  try{


    const tenant =
      await tenantService.deleteTenant(
        req.params.id
      );


    res.status(200).json({
      success:true,
      message:"Tenant deleted successfully",
      data:tenant,
    });


  }catch(error){

    next(error);

  }

};



module.exports = {

  createTenant,

  getAllTenants,

  getTenantById,

  updateTenant,

  deleteTenant,

};