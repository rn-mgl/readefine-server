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

const isUniqueUserEmail = async (candidateEmail) => {
  async (req, res) => {
    const data = await User.findWithEmail(candidateEmail);

    if (!data) {
      throw new BadRequestError(`Error in getting user with the given email. Try again later.`);
    }

    return data;
  };
};

const isUniqueAdminEmail = async (candidateEmail) => {
  async (req, res) => {
    const data = await Admin.findWithEmail(candidateEmail);

    if (!data) {
      throw new BadRequestError(`Error in getting user with the given email. Try again later.`);
    }

    return data;
  };
};

const createToken = (id, username, email) => {
  const token = jwt.sign({ id, username, email }, process.env.JWT_SECRET, {
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
  isUniqueUserEmail,
  isUniqueAdminEmail,
  createToken,
  getLexile,
};
