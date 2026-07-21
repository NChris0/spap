const mongoose = require("mongoose");



const connectDB = async () => {

  try {


    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        serverSelectionTimeoutMS: 5000
      }
    );


    console.log(
      "✅ MongoDB Connected Successfully"
    );



    mongoose.connection.on(
      "error",
      (error)=>{

        console.error(
          "❌ MongoDB Error:",
          error.message
        );

      }
    );



    mongoose.connection.on(
      "disconnected",
      ()=>{

        console.warn(
          "⚠️ MongoDB Disconnected"
        );

      }
    );



  } catch(error) {


    console.error(
      "❌ MongoDB Connection Failed"
    );


    console.error(
      error.message
    );


    process.exit(1);

  }

};



module.exports = connectDB;