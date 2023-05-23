const { BadRequestError } = require("../../../errors");
const Dashboard = require("../../../models/dashboard/Dashboard");
const { StatusCodes } = require("http-status-codes");

const getCounts = async (req, res) => {
  const data = await Dashboard.getCounts();

  if (!data) {
    throw new BadRequestError(`Error in getting counts for dashboard.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getCounts };
