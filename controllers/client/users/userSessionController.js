const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const UserSession = require("../../../models/users/UserSession");
const User = require("../../../models/users/User");

const createSession = async (req, res) => {
  const { type, userId } = req.body;

  const user = await User.getUser(userId);

  if (!user) {
    throw new NotFoundError(`The user does not exist.`);
  }

  const userSession = new UserSession(userId, type);

  const newSession = await userSession.createSession();

  if (!newSession) {
    throw new BadRequestError(`There was a problem in updating your session records.`);
  }

  res.status(StatusCodes.OK).json(newSession);
};

module.exports = { createSession };
