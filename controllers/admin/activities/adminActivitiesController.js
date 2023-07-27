const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthorizedError } = require("../../../errors");
const AdminActivities = require("../../../models/activities/AdminActivities");

const getAllAdminActivities = async (req, res) => {
  const { admin_id } = req.params;
  const { id } = req.user;

  if (parseInt(admin_id) !== id) {
    throw new UnauthorizedError(`You can only view your own information.`);
  }

  const data = await AdminActivities.getAllAdminActivities(admin_id);

  if (!data) {
    throw new BadRequestError(`There was a problem in getting all your activities.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getAllAdminActivities };
