const Job = require("../models/job");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Application = require("../models/application");
// const { hideChars, getAverageRating } = require("../utils/helpers");
dotenv.config();

const createJob = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(401).json({
        status: false,
        message: "Fill the in the job details",
      });
    }

    const result = await Job.create(req.body);
    return res.status(201).json({
      status: true,
      message: "Job created successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      status: true,
      message: `Unable to create job. Please try again. \n Error: ${err}`,
    });
  }
};

const getJob = async (req, res) => {
  try {
    const { id } = req.params;

    let job;

    if (req.user) {
      job = await Job.findById(id).populate("applications");
    } else {
      job = await Job.findById(id);
    }

    if (job == null) {
      return res.status(401).json({
        status: false,
        message: "Job does not exist.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to fetch job. Please try again. \n Error: ${error}`,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    return res.status(201).json({
      status: true,
      message: "Got jobs successfully",
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to fetch jobs. Please try again. \n Error: ${error}`,
    });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(201).json({
      status: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to update job. Please try again. \n Error: ${error}`,
    });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    await Job.findByIdAndDelete(id);

    return res.status(201).json({
      status: true,
      message: "Job successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: `Unable to delete job. Please try again. \n Error: ${error}`,
    });
  }
};

module.exports = {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
};
