const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const UserSession = require("../../../models/users/UserSession");
const User = require("../../../models/users/User");

const createSession = async (req, res) => {
  const { id } = req.body;

  const ifExist = await User.getUser(id);

  if (!ifExist) {
    throw new NotFoundError(`The user you are trying to create a session to does not exist.`);
  }

  const userSession = new UserSession(id);

  if (!userSession) {
    throw new BadRequestError(`There was a problem in creating the user's session.`);
  }

  res.status(StatusCodes.OK).json(userSession);
};

module.exports = { createSession };
