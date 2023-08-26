const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// const { hideChars, getAverageRating } = require("../utils/helpers");
dotenv.config();

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        status: false,
        message: "Fill the in your details",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status: false,
        message: "User already exists with email",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    return res.status(201).json({
      status: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      status: true,
      message: `Unable to create user. Please try again. \n Error: ${err}`,
    });
  }
};

const loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({
      status: false,
      message: "Email and password required",
    });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    return res.status(401).json({
      status: false,
      message: "User does not exist.",
    });
  }

  if (user.isDeactivated) {
    return res.status(401).json({
      status: false,
      message: "Account has been deactivated.",
    });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN);
      const userData = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userToken: accessToken,
        phoneNumber: user.phoneNumber,
      };

      return res.status(200).json({
        status: true,
        message: "Logged in successfully",
        data: userData,
      });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    return res.status(201).json({
      status: true,
      message: "Got user successfully",
      data: userData,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    return res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const deactivateAccount = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { isDeactivated: true });

    return res.status(201).json({
      status: true,
      message: "User successfully deactivated",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  updatePassword,
  deactivateAccount,
};
