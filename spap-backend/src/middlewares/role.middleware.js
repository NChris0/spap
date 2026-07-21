const {
  HTTP_STATUS
} = require("../shared/constants");



// ===============================
// Role Authorization Middleware
// ===============================
const allowRoles = (...allowedRoles) => {


  return (req, res, next) => {

    try {


      // Check if user exists
      if (!req.user) {

        const error = new Error(
          "Authentication required"
        );

        error.statusCode =
          HTTP_STATUS.UNAUTHORIZED;

        throw error;

      }



      // Get User Role
      const userRole =
        req.user.role?.name;



      // Check Role Permission
      if (!allowedRoles.includes(userRole)) {


        const error = new Error(
          "You do not have permission to perform this action"
        );


        error.statusCode =
          HTTP_STATUS.FORBIDDEN;


        throw error;

      }



      next();



    } catch(error) {

      next(error);

    }

  };

};



module.exports = {
  allowRoles
};