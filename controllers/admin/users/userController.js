const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const User = require("../../../models/users/User");

const findWithEmail = async (req, res) => {
  const { email } = req.user;

  const user = await User.findWithEmail(email);

  if (!user) {
    throw new NotFoundError(`There is no account with the given email.`);
  }

  res.status(StatusCodes.OK).json(user);
};

const getAllUsers = async (req, res) => {
  const { searchFilter, sortFilter, dateRangeFilter, lexileRangeFilter } = req.query;

  const user = await User.getAllUsers(searchFilter, sortFilter, dateRangeFilter, lexileRangeFilter);

  if (!user) {
    throw new BadRequestError(`Error in getting all users. Try again later.`);
  }

  res.status(StatusCodes.OK).json(user);
};

const getUser = async (req, res) => {
  const { user_id } = req.body;

  const user = await User.getUser(user_id);

  if (!user) {
    throw new BadRequestError(`Error in getting user. Try again later.`);
  }

  res.status(StatusCodes.OK).json(user);
};

module.exports = { findWithEmail, getAllUsers, getUser };
