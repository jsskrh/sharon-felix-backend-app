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
      required: true,
    },
    passport: {
      type: String,
      trim: true,
      required: true,
    },
    nationality: {
      type: String,
      trim: true,
      required: true,
    },
    religion: {
      type: String,
      trim: true,
    },
    sex: {
      type: String,
      trim: true,
      enum: ["male", "female"],
      required: true,
    },
    maritalStatus: {
      type: String,
      trim: true,
      enum: ["single", "widow", "widower", "married", "divorced"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      trim: true,
      required: true,
    },
    nOKFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    nOKLastName: {
      type: String,
      required: true,
      trim: true,
    },
    nOKPhoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    cv: {
      required: true,
      type: String,
      trim: true,
    },
    lastPlacesOfWork: [
      {
        name: { type: String, required: true, trim: true },
        phoneNumber: { type: String, required: true, trim: true },
        reasonForLeaving: { type: String, required: true },
      },
    ],
    guarantors: [
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
        address: {
          type: String,
          trim: true,
          required: true,
        },
        passport: {
          type: String,
          trim: true,
          required: true,
        },
        nationality: {
          type: String,
          trim: true,
          required: true,
        },
        religion: {
          type: String,
          trim: true,
        },
        sex: {
          type: String,
          trim: true,
          enum: ["male", "female"],
          required: true,
        },
        maritalStatus: {
          type: String,
          trim: true,
          enum: ["single", "widow", "widower", "married", "divorced"],
          required: true,
        },
        dateOfBirth: {
          type: Date,
          trim: true,
          required: true,
        },
      },
    ],
    paymentStatus: {
      default: false,
      type: Boolean,
      trim: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
