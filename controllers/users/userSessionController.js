const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const UserSession = require("../../models/users/UserSession");

const createSession = async (req, res) => {
  const { id } = req.body;

  const userSession = new UserSession(id);

  if (!userSession) {
    throw new BadRequestError(`Error in creating session. Try again later.`);
  }

  res.status(StatusCodes.OK).json(userSession);
};

module.exports = { createSession };
