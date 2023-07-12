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
  const user = await User.getAllUsers();

  if (!user) {
    throw new BadRequestError(`Error in getting all users. Try again later.`);
  }

  res.status(StatusCodes.OK).json(user);
};

const getUser = async (req, res) => {
  const { user_id } = req.params;

  const user = await User.getUser(user_id);

  if (!user) {
    throw new BadRequestError(`Error in getting user. Try again later.`);
  }

  res.status(StatusCodes.OK).json(user);
};
const updateUser = async (req, res) => {
  const { name, surname, username, image } = req.body;
  const { user_id } = req.params;

  const data = await User.updateUser(user_id, name, surname, username, image);

  if (!data) {
    throw new BadRequestError(`Error in updating your profile. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};
module.exports = { findWithEmail, getAllUsers, getUser, updateUser };
