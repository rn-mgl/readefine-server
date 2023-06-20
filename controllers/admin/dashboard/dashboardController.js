const { BadRequestError } = require("../../../errors");
const Dashboard = require("../../../models/dashboard/Dashboard");
const { StatusCodes } = require("http-status-codes");

const getDashboardData = async (req, res) => {
  const { query } = req.query;

  if (query === "counts") {
    const data = await Dashboard.getCounts();

    if (!data) {
      throw new BadRequestError(`Error in getting counts for dashboard.`);
    }

    res.status(StatusCodes.OK).json(data);
    return;
  }

  if (query === "updates") {
    const data = await Dashboard.getUpdates();

    if (!data) {
      throw new BadRequestError(`Error in getting updates for dashboard.`);
    }

    res.status(StatusCodes.OK).json(data);
    return;
  }
};

module.exports = { getDashboardData };
