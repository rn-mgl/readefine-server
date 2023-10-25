const { StatusCodes } = require("http-status-codes");
const AdminActivities = require("../../../models/activities/AdminActivities");
const { BadRequestError } = require("../../../errors");

const getAllAdminActivity = async (req, res) => {
  const { activityType } = req.body;

  const adminActivities = await AdminActivities.getAllAdminActivity(activityType);

  if (!adminActivities) {
    throw new BadRequestError(`Error in getting all admin activities. Try again later.`);
  }

  res.status(StatusCodes.OK).json(adminActivities);
};

module.exports = { getAllAdminActivity };
