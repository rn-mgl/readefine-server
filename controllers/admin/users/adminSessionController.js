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

  const adminSession = new AdminSession(adminId, type);

  const newSession = await adminSession.createSession();

  if (!newSession) {
    throw new BadRequestError(`There was a problem in updating your session records.`);
  }

  res.status(StatusCodes.OK).json(newSession);
};

const getAdminSessions = async (req, res) => {
  const { admin_id } = req.params;

  const admin = await Admin.getAdmin(admin_id);

  if (!admin) {
    throw new NotFoundError(`The admin does not exist.`);
  }

  const adminSession = await AdminSession.getAdminSessions(admin.admin_id);

  if (!adminSession) {
    throw new BadRequestError(`There was a problem in updating your session records.`);
  }

  res.status(StatusCodes.OK).json(adminSession);
};

module.exports = { createSession, getAdminSessions };
