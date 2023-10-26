const { StatusCodes } = require("http-status-codes");
const AdminActivities = require("../../../models/activities/AdminActivities");
const { BadRequestError } = require("../../../errors");

const getAllAdminActivity = async (req, res) => {
  const { searchFilter, sortFilter, resourceTypeFilter, dateRangeFilter, activityTypeFilter } = req.query;

  const adminActivities = await AdminActivities.getAllAdminActivity(
    searchFilter,
    sortFilter,
    resourceTypeFilter,
    dateRangeFilter,
    activityTypeFilter
  );

  if (!adminActivities) {
    throw new BadRequestError(`Error in getting all admin activities. Try again later.`);
  }

  res.status(StatusCodes.OK).json(adminActivities);
};

module.exports = { getAllAdminActivity };
