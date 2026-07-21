const dotenv = require("dotenv");


// Load .env file
dotenv.config();



// ===============================
// Environment Configuration
// ===============================

const env = {

  // Application
  NODE_ENV:
    process.env.NODE_ENV || "development",


  PORT:
    process.env.PORT || 5000,



  // Database
  MONGODB_URI:
    process.env.MONGODB_URI,



  // Authentication
  JWT_SECRET:
    process.env.JWT_SECRET,


  JWT_EXPIRES_IN:
    process.env.JWT_EXPIRES_IN || "7d",



};




// ===============================
// Required Environment Variables
// ===============================

const requiredEnv = [
  "MONGODB_URI",
  "JWT_SECRET"
];



requiredEnv.forEach((key)=>{


  if(!env[key]){

    console.error(
      `❌ Missing environment variable: ${key}`
    );

    process.exit(1);

  }


});





module.exports = env;