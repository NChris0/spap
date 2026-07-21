require("dotenv").config();

const mongoose = require("mongoose");

const Club = require("../modules/clubs/club.model");
const Role = require("../modules/roles/role.model");

const connectDB = require("../config/db");


const seedData = async () => {

  try {

    await connectDB();


    // Clear old data
    await Club.deleteMany();
    await Role.deleteMany();


    // Create Clubs

    const clubs = await Club.insertMany([
      {
        name: "APR FC",
        shortName: "APR",
        clubCode: "APR001",
        country: "Rwanda",
        city: "Kigali",
        status: "active"
      },

      {
        name: "Rayon Sports FC",
        shortName: "RAYON",
        clubCode: "RS001",
        country: "Rwanda",
        city: "Kigali",
        status: "active"
      },

      {
        name: "Police FC",
        shortName: "POLICE",
        clubCode: "POL001",
        country: "Rwanda",
        city: "Kigali",
        status: "active"
      }
    ]);


    const aprClub = clubs.find(
      club => club.clubCode === "APR001"
    );


    const rayonClub = clubs.find(
      club => club.clubCode === "RS001"
    );


    // Create Roles

    await Role.insertMany([

      {
        name:"SUPER_ADMIN",
        description:"System administrator",
        permissions:[
          "CREATE_CLUB",
          "MANAGE_USERS",
          "MANAGE_ROLES"
        ],
        clubId:null
      },


      {
        name:"APR_ADMIN",
        description:"APR FC administrator",
        permissions:[
          "MANAGE_PLAYERS",
          "MANAGE_COACHES",
          "VIEW_REPORTS"
        ],
        clubId:aprClub._id
      },


      {
        name:"APR_COACH",
        description:"APR FC coach",
        permissions:[
          "VIEW_PLAYERS",
          "ADD_PERFORMANCE"
        ],
        clubId:aprClub._id
      },


      {
        name:"RAYON_ADMIN",
        description:"Rayon Sports administrator",
        permissions:[
          "MANAGE_PLAYERS",
          "VIEW_REPORTS"
        ],
        clubId:rayonClub._id
      }

    ]);


    console.log("✅ Seed data inserted successfully");


    process.exit();


  } catch(error){

    console.log(error);
    process.exit(1);

  }

};


seedData();