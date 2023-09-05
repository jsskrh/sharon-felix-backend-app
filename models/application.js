const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
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
    address: {
      type: String,
      trim: true,
    },
    nationality: {
      type: String,
      trim: true,
    },
    religion: {
      type: String,
      trim: true,
    },
    sex: {
      type: String,
      trim: true,
      enum: ["male", "female"],
    },
    dateOfBirth: {
      type: String,
      trim: true,
    },
    cv: {
      required: true,
      type: String,
      trim: true,
    },
    paymentStatus: {
      default: false,
      type: Boolean,
      trim: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    company: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
