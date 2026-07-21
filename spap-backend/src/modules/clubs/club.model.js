const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    shortName: {
      type: String,
      trim: true,
    },

    clubCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
    },

    city: {
      type: String,
    },

    logo: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Club", clubSchema);