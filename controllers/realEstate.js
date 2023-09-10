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
      message: "Real estate created successfully",
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
      message: "Real estate fetched successfully",
      data: realEstate,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to fetch real estate. Please try again. \n Error: ${error}`,
    });
  }
};

const makeRequest = async (req, res) => {
  try {
    const check = await Request.find({
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      realEstate: req.params.id,
    });

    if (check.length !== 0) {
      return res.status(400).json({
        status: true,
        message: "You have already made a request.",
      });
    }

    const request = await Request.create({
      ...req.body,
      realEstate: req.params.id,
    });
    const realEstate = await RealEstate.findById(req.params.id);

    realEstate.requests.push(request._id);
    await realEstate.save();

    return res.status(201).json({
      status: true,
      message: "Request has been made successfully",
      data: request,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to make request. Please try again. \n Error: ${error}`,
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
      message: "Real estate updated successfully",
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
      message: "Real estate successfully deleted",
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
  makeRequest,
};
