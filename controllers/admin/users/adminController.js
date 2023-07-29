const { StatusCodes, BAD_GATEWAY } = require("http-status-codes");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../../../errors");
const Admin = require("../../../models/users/Admin");
const { hashPassword, isMatchedPassword } = require("../../functionController");

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

const updateAdmin = async (req, res) => {
  const { type } = req.body;

  const { admin_id } = req.params;
  const { id } = req.user;

  if (parseInt(admin_id) !== id) {
    throw new UnauthorizedError(`You are not allowed to change other's data.`);
  }

  const ifExist = await Admin.getAdmin(admin_id);

  if (!ifExist) {
    throw new NotFoundError(`The admin you are trying to update does not exist.`);
  }

  if (type === "main") {
    const { image, name, surname, username } = req.body;

    const ifUsernameTaken = await Admin.findWithUsername(username);

    if (ifUsernameTaken && ifUsernameTaken.admin_id !== id) {
      throw new BadRequestError(`The username is already taken.`);
    }

    const data = await Admin.updateAdmin(admin_id, image, name, surname, username);

    if (!data) {
      throw new BadRequestError(`Error in updating admin. Try again later.`);
    }

    res.status(StatusCodes.OK).json(data);

    return;
  } else if (type === "password") {
    const { oldPassword, newPassword } = req.body;

    const adminData = await Admin.getAdmin(id);

    if (!adminData) {
      throw new BadRequestError(`Error in getting admin. Try again later.`);
    }

    const { password } = adminData;

    const isCorrectOldPassword = await isMatchedPassword(password, oldPassword);

    if (!isCorrectOldPassword) {
      throw new BadRequestError(`The old password you entered is incorrect.`);
    }

    const hashedPassword = await hashPassword(newPassword);

    const changedPassword = await Admin.changePassword(id, hashedPassword);

    if (!changedPassword) {
      throw new BadRequestError(`Error in changing password. Try again later.`);
    }

    res.status(StatusCodes.OK).json(changedPassword);
  }
};

module.exports = { findWithEmail, getAdmin, getAllAdmins, updateAdmin };
