const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const UserSession = require("../../../models/users/UserSession");

const createSession = async (req, res) => {
  const { type } = req.body;
  const { id } = req.user;

  const userSession = new UserSession(id, type);

  const newSession = await userSession.createSession();

  if (!newSession) {
    throw new BadRequestError(`There was a problem in updating your session records.`);
  }

  res.status(StatusCodes.OK).json(newSession);
};

module.exports = { createSession };
