const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../../../errors");
const UserActivities = require("../../../models/activities/UserActivities");
const User = require("../../../models/users/User");

const getAllUserActivities = async (req, res) => {
  const { user_id } = req.params;
  const { id } = req.user;

  const ifExist = await User.getUser(user_id);

  if (!ifExist) {
    throw new NotFoundError(`The user you are trying to get the achievement to does not exist.`);
  }

  if (parseInt(user_id) !== id) {
    throw new UnauthorizedError(`You can only access your own information.`);
  }

  const data = await UserActivities.getAllUserActivities(user_id);

  if (!data) {
    throw new BadRequestError(`There was a problem in getting all your activities.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getAllUserActivities };
