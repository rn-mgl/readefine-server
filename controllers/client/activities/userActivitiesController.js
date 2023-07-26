const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthorizedError } = require("../../../errors");
const UserActivities = require("../../../models/activities/UserActivities");

const getAllUserActivities = async (req, res) => {
  const { user_id } = req.params;
  const { id } = req.user;

  if (parseInt(user_id) !== id) {
    throw new UnauthorizedError(`You can only access your own information.`);
  }

  const data = await UserActivities.getAllUserActivities(user_id);

  if (!data) {
    throw new BadRequestError(`Error in getting all your activities. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getAllUserActivities };
