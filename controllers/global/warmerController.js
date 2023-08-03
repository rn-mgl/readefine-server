const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");
const User = require("../../models/users/User");

const getUserCount = async (req, res) => {
  const data = await User.getUserCount();

  if (!data) {
    throw new BadRequestError(`There was a problem in getting the number of users.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getUserCount };
