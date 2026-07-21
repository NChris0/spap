const dotenv = require("dotenv");

const app = require("./app");

const connectDB = require("./config/db");



// Load environment variables
dotenv.config();



// ===============================
// Server Configuration
// ===============================

const PORT = process.env.PORT || 5000;



// ===============================
// Start Server
// ===============================

const startServer = async () => {

  try {


    // Connect Database
    await connectDB();



    // Start Express Server
    app.listen(
      PORT,
      () => {

        console.log(
          `SPAP Server running on port ${PORT}`
        );

      }
    );


  } catch (error) {


    console.error(
      "Server startup failed:",
      error.message
    );


    process.exit(1);

  }

};




// Run Server
startServer();