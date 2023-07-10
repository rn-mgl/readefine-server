const { StatusCodes, BAD_GATEWAY } = require("http-status-codes");
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
  const { admin_id } = req.params;

  const admin = await Admin.getAdmin(admin_id);

  if (!admin) {
    throw new BadRequestError(`Error in getting admin. Try again later.`);
  }

  res.status(StatusCodes.OK).json(admin);
};

const updateAdmin = async (req, res) => {
  const { image, name, surname, username } = req.body;
  const { admin_id } = req.params;

  const data = await Admin.updateAdmin(admin_id, image, name, surname, username);

  if (!data) {
    throw new BadRequestError(`Error in updating admin. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { findWithEmail, getAdmin, getAllAdmins, updateAdmin };
