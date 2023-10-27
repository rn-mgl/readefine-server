const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthorizedError } = require("../../../errors");
const AdminActivities = require("../../../models/activities/AdminActivities");
const Admin = require("../../../models/users/Admin");

const createAdminActivity = async (req, res) => {
  const { resourceType, resourceName, activityTypeFilter } = req.body;
  const { id } = req.user;

  const adminActivity = new AdminActivities(id, resourceType, resourceName, activityTypeFilter);

  const data = await adminActivity.createAdminActivity();

  if (!data) {
    throw new BadRequestError(`Error in recording admin activity. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getSingleAdminActivity = async (req, res) => {
  const { admin_id } = req.params;
  const { activityTypeFilter } = req.query;
  const { id } = req.user;

  const ifExist = await Admin.getAdmin(admin_id);

  if (!ifExist) {
    throw new UnauthorizedError(`You can only view your own information.`);
  }

  if (parseInt(admin_id) !== id) {
    throw new UnauthorizedError(`You can only view your own information.`);
  }

  const data = await AdminActivities.getSingleAdminActivity(admin_id, activityTypeFilter);

  if (!data) {
    throw new BadRequestError(`There was a problem in getting all your activities.`);
  }

  res.status(StatusCodes.OK).json(data);
};

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

module.exports = { createAdminActivity, getAllAdminActivity, getSingleAdminActivity };
