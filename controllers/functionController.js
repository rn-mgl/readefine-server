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

module.exports = {
  hashPassword,
  isMatchedPassword,
  createSignUpToken,
  createLogInToken,
  getLexile,
};
