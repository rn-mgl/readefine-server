const User = require("../models/users/User");
const Admin = require("../models/users/Admin");
const lexile = require("../lexileMap");
const { BadRequestError } = require("../errors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

const isMatchedPassword = async (password, candidatePassword) => {
  const isMatch = await bcrypt.compare(candidatePassword, password);
  return isMatch;
};

const createSignUpToken = (id, username, email, role) => {
  const token = jwt.sign({ id, username, email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.EMAIL_TTL,
  });

  return token;
};

const createLogInToken = (id, username, email, role) => {
  const token = jwt.sign({ id, username, email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TTL,
  });

  return token;
};

const getLexile = (gradeLevel) => {
  return lexile[gradeLevel];
};

const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  const decodedToken = jwt.decode(token);

  if (!decodedToken) {
    return true;
  }

  const currentTime = Date.now() / 1000;
  return currentTime > decodedToken.exp;
};

module.exports = {
  hashPassword,
  isMatchedPassword,
  createSignUpToken,
  createLogInToken,
  getLexile,
  isTokenExpired,
};
