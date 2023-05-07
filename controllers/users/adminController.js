const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
const Admin = require("../../models/users/Admin");

const verifyAdmin = async (req, res) => {
  const { id } = req.user;

  const admin = await Admin.verifyAdmin(id);

  if (!admin) {
    throw new BadRequestError(`Error in verifying your account. Try again later.`);
  }

  res.status(StatusCodes.OK).json(admin);
};

const getAllAdmins = async (req, res) => {
  const admin = await Admin.getAllAdmins();

  if (!admin) {
    throw new BadRequestError(`Error in getting all users. Try again later.`);
  }

  res.status(StatusCodes.OK).json(admin);
};

const getAdmin = async (req, res) => {
  const { user_id } = req.body;

  const admin = await Admin.getAdmin(user_id);

  if (!admin) {
    throw new BadRequestError(`Error in getting admin. Try again later.`);
  }

  res.status(StatusCodes.OK).json(admin);
};

module.exports = { createAdmin, verifyAdmin, getAdmin, getAllAdmins };
