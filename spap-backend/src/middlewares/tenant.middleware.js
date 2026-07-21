const {
  HTTP_STATUS
} = require("../shared/constants");



// ===============================
// Tenant Guard Middleware
// ===============================
const tenantGuard = (req, res, next) => {

  try {


    // Check authenticated user
    if (!req.user) {

      const error = new Error(
        "Authentication required"
      );

      error.statusCode =
        HTTP_STATUS.UNAUTHORIZED;

      throw error;

    }



    // Check tenant availability
    if (!req.user.club) {


      const error = new Error(
        "Tenant information is required"
      );


      error.statusCode =
        HTTP_STATUS.FORBIDDEN;


      throw error;

    }



    // Attach tenant context
    req.tenant = req.user.club;



    next();



  } catch(error) {

    next(error);

  }

};




module.exports = {
  tenantGuard
};