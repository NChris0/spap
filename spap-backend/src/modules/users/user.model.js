// =============================================
// User Model
// Stores system users
// =============================================


const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(

{

    // =========================================
    // Basic Information
    // =========================================


    firstName: {

        type: String,

        required: true,

        trim: true

    },


    lastName: {

        type: String,

        required: true,

        trim: true

    },


    email: {

        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true

    },


    phone: {

        type: String,

        default: null

    },



    // =========================================
    // Authentication
    // =========================================


    password: {

        type: String,

        required: true,

        select: false

    },



    // =========================================
    // Access Control
    // =========================================


    role: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Role",

        required: true

    },



    // =========================================
    // Tenant Ownership
    // =========================================


    club: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Club",

        default: null

    },



    // =========================================
    // Account Status
    // =========================================


    status: {

        type: String,

        enum: [

            "active",

            "inactive",

            "pending",

            "suspended",

            "deleted"

        ],

        default: "pending"

    },


    isVerified: {

        type: Boolean,

        default: false

    }


},

{

    timestamps: true

}

);



// =========================================
// Indexes
// =========================================


userSchema.index({

    email: 1

});


userSchema.index({

    club: 1

});


userSchema.index({

    role: 1

});



module.exports = mongoose.model(

    "User",

    userSchema

);