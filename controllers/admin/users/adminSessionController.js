const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const AdminSession = require("../../../models/users/AdminSession");

const createSession = async (req, res) => {
  const { type, adminId } = req.body;

  const userSession = new AdminSession(adminId, type);

  const newSession = await userSession.createSession();

  if (!newSession) {
    throw new BadRequestError(`There was a problem in updating your session records.`);
  }

  res.status(StatusCodes.OK).json(newSession);
};

module.exports = { createSession };
