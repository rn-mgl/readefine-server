const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");
const AdminActivities = require("../../../models/activities/AdminActivities");

const getAllAdminActivities = async (req, res) => {
  const { admin_id } = req.params;

  const data = await AdminActivities.getAllAdminActivities(admin_id);

  if (!data) {
    throw new BadRequestError(`Error in getting your activities. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getAllAdminActivities };
