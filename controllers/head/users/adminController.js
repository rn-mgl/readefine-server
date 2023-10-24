const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../../../errors");
const Admin = require("../../../models/users/Admin");

const getAllAdmins = async (req, res) => {
  const admin = await Admin.getAllAdmins();

  if (!admin) {
    throw new BadRequestError(`There was a problem in getting all the admins.`);
  }

  res.status(StatusCodes.OK).json(admin);
};

const getAdmin = async (req, res) => {
  const { admin_id } = req.params;

  const { id } = req.user;

  if (parseInt(admin_id) !== id) {
    throw new UnauthorizedError(`You are not allowed to get other's data.`);
  }

  const admin = await Admin.getAdmin(admin_id);

  if (!admin) {
    throw new NotFoundError(`The admin you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(admin);
};

module.exports = { getAdmin, getAllAdmins };
