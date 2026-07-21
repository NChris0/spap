const {
  HTTP_STATUS
} = require("../shared/constants");




// ===============================
// Permission Authorization Middleware
// ===============================
const requirePermission = (...requiredPermissions) => {


  return (req, res, next) => {

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



      // Get user permissions
      const userPermissions =
        req.user.role?.permissions || [];



      // Check permissions
      const hasPermission =
        requiredPermissions.every(
          permission =>
            userPermissions.includes(permission)
        );



      if (!hasPermission) {


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
  requirePermission
};