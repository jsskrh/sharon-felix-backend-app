const mongoose = require("mongoose");

const realEstateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    realEstateType: {
      type: String,
      trim: true,
      enum: ["rent", "sell"],
      required: true,
    },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
      },
    ],
  },
  { timestamps: true }
);

const RealEstate = mongoose.model("RealEstate", realEstateSchema);
module.exports = RealEstate;
