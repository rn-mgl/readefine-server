const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");
const UserActivities = require("../../../models/activities/UserActivities");

const getAllUserActivities = async (req, res) => {
  const { user_id } = req.params;

  const data = await UserActivities.getAllUserActivities(user_id);

  if (!data) {
    throw new BadRequestError(`Error in getting all your activities. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getAllUserActivities };
