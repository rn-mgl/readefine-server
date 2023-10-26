const { StatusCodes } = require("http-status-codes");
const AdminActivities = require("../../../models/activities/AdminActivities");
const { BadRequestError } = require("../../../errors");

const getAllAdminActivity = async (req, res) => {
  const { resourceType, activityType } = req.query;

  const adminActivities = await AdminActivities.getAllAdminActivity(resourceType, activityType);

  if (!adminActivities) {
    throw new BadRequestError(`Error in getting all admin activities. Try again later.`);
  }

  res.status(StatusCodes.OK).json(adminActivities);
};

module.exports = { getAllAdminActivity };
