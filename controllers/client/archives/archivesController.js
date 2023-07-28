const { BadRequestError, UnauthorizedError, NotFoundError } = require("../../../errors");
const Dashboard = require("../../../models/dashboard/Dashboard");
const { StatusCodes } = require("http-status-codes");
const User = require("../../../models/users/User");

const getSingleUserCounts = async (req, res) => {
  const { userId } = req.query;
  const { id } = req.user;

  const ifExist = await User.getUser(userId);

  if (!ifExist) {
    throw new NotFoundError(`You can only access your own information.`);
  }

  if (id !== parseInt(userId)) {
    throw new UnauthorizedError(`You can only access your own information.`);
  }

  const data = await Dashboard.getSingleUserCounts(userId);

  if (!data) {
    throw new BadRequestError(`There was a problem in getting all your counts.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getSingleUserCounts };
