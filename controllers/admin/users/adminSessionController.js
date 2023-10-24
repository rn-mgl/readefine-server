const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const AdminSession = require("../../../models/users/AdminSession");
const Admin = require("../../../models/users/Admin");

const createSession = async (req, res) => {
  const { type, adminId } = req.body;

  const admin = await Admin.getAdmin(adminId);

  if (!admin) {
    throw new NotFoundError(`The admin does not exist.`);
  }

  const userSession = new AdminSession(adminId, type);

  const newSession = await userSession.createSession();

  if (!newSession) {
    throw new BadRequestError(`There was a problem in updating your session records.`);
  }

  res.status(StatusCodes.OK).json(newSession);
};

module.exports = { createSession };
