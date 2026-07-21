const User = require("../modules/users/user.model");

const {
  verifyToken
} = require("../modules/auth/jwt.service");

const {
  HTTP_STATUS
} = require("../shared/constants");



// ===============================
// Authentication Middleware
// ===============================
const protect = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;


    // Check Authorization Header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {

      const error = new Error(
        "Authentication required"
      );

      error.statusCode = HTTP_STATUS.UNAUTHORIZED;

      throw error;
    }



    // Extract Token
    const token = authHeader.split(" ")[1];



    // Verify Token
    const decoded = verifyToken(token);



    // Find User
    const user = await User.findById(
      decoded.userId
    )
    .populate("role")
    .populate("club");



    if (!user) {

      const error = new Error(
        "User not found"
      );

      error.statusCode =
        HTTP_STATUS.UNAUTHORIZED;

      throw error;

    }



    // Attach User To Request
    req.user = user;



    next();



  } catch (error) {


    if(error.name === "JsonWebTokenError"){

      error.statusCode =
        HTTP_STATUS.UNAUTHORIZED;

      error.message =
        "Invalid token";

    }



    if(error.name === "TokenExpiredError"){

      error.statusCode =
        HTTP_STATUS.UNAUTHORIZED;

      error.message =
        "Token expired";

    }



    next(error);

  }

};



module.exports = {
  protect
};