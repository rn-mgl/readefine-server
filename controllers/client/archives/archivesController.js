const { BadRequestError } = require("../../../errors");
const Dashboard = require("../../../models/dashboard/Dashboard");
const { StatusCodes } = require("http-status-codes");

const getSingleUserCounts = async (req, res) => {
  const { userId } = req.query;

  const data = await Dashboard.getSingleUserCounts(userId);

  if (!data) {
    throw new BadRequestError(`Error in getting count data. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getSingleUserCounts };
