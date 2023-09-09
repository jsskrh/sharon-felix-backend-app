const RealEstate = require("../models/realEstate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Request = require("../models/request");
// const { hideChars, getAverageRating } = require("../utils/helpers");
dotenv.config();

const createRealEstate = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(401).json({
        status: false,
        message: "Fill the in the real estate details",
      });
    }

    const result = await RealEstate.create(req.body);
    return res.status(201).json({
      status: true,
      message: "RealEstate created successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      status: true,
      message: `Unable to create real estate. Please try again. \n Error: ${err}`,
    });
  }
};

const getRealEstate = async (req, res) => {
  try {
    const { id } = req.params;

    let realEstate;

    if (req.user) {
      realEstate = await RealEstate.findById(id).populate("requests");
    } else {
      realEstate = await RealEstate.findById(id);
    }

    if (realEstate == null) {
      return res.status(401).json({
        status: false,
        message: "Real estate does not exist.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "RealEstate fetched successfully",
      data: realEstate,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to fetch real estate. Please try again. \n Error: ${error}`,
    });
  }
};

const getAllRealEstate = async (req, res) => {
  try {
    const realEstates = await RealEstate.find();

    return res.status(201).json({
      status: true,
      message: "Got real estates successfully",
      data: realEstates,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to fetch real estates. Please try again. \n Error: ${error}`,
    });
  }
};

const updateRealEstate = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRealEstate = await RealEstate.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(201).json({
      status: true,
      message: "RealEstate updated successfully",
      data: updatedRealEstate,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to update real estate. Please try again. \n Error: ${error}`,
    });
  }
};

const deleteRealEstate = async (req, res) => {
  const { id } = req.params;

  try {
    await RealEstate.findByIdAndDelete(id);

    return res.status(201).json({
      status: true,
      message: "RealEstate successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to delete real estate. Please try again. \n Error: ${error}`,
    });
  }
};

module.exports = {
  createRealEstate,
  getRealEstate,
  getAllRealEstate,
  updateRealEstate,
  deleteRealEstate,
};
