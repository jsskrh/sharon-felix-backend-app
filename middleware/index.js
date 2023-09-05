const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

function authToken(req, res, next) {
  if (
    !req.body.token &&
    !req.query.token &&
    !req.headers["x-access-token"] &&
    !req.headers["authorization"]
  ) {
    return res.status(404).json({
      status: false,
      message: "User not authenticated",
    });
  }

  const authHeader = req.headers["authorization"];

  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      status: false,
      message: "A token is required for authentication",
    });
  }
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = user;
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid Token",
    });
  }
  return next();
}

function isAuthenticated(req, res, next) {
  if (
    !req.body.token &&
    !req.query.token &&
    !req.headers["x-access-token"] &&
    !req.headers["authorization"]
  ) {
    return next();
  }

  const authHeader = req.headers["authorization"];

  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    authHeader.split(" ")[1];

  if (!token) {
    return next();
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = user;
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid Token",
    });
  }
  return next();
}

module.exports = {
  authToken,
  isAuthenticated,
};
