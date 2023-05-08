const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Admin = require("../../../models/users/Admin");

const findWithEmail = async (req, res) => {
  const { email } = req.user;

  const user = await Admin.findWithEmail(email);

  if (!user) {
    throw new NotFoundError(`There is no admin with the given email.`);
  }

  res.status(StatusCodes.OK).json(user);
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

module.exports = { findWithEmail, getAdmin, getAllAdmins };
