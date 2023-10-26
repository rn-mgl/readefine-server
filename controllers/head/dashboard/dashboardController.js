const { BadRequestError } = require("../../../errors");
const Dashboard = require("../../../models/dashboard/Dashboard");
const { StatusCodes } = require("http-status-codes");

const getDashboardData = async (req, res) => {
  const data = await Dashboard.getHeadUpdates();

  if (!data) {
    throw new BadRequestError(`There was a problem in getting the latest updates.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getDashboardData };
