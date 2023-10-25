const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../../../errors");
const Admin = require("../../../models/users/Admin");
const fns = require("../../functionController");
const { sendVerificationEmail } = require("../../admin/mail/verificationMail");

const getAllAdmins = async (req, res) => {
  const admin = await Admin.getAllAdmins();

  if (!admin) {
    throw new BadRequestError(`There was a problem in getting all the admins.`);
  }

  res.status(StatusCodes.OK).json(admin);
};

const getAdmin = async (req, res) => {
  const { admin_id } = req.params;

  const admin = await Admin.getAdmin(admin_id);

  if (!admin) {
    throw new NotFoundError(`The admin you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(admin);
};

const deleteAdmin = async (req, res) => {
  const { admin_id } = req.params;

  const admin = await Admin.getAdmin(admin_id);

  if (!admin) {
    throw new NotFoundError(`The admin you are trying to view does not exist.`);
  }

  const deleteAdmin = await Admin.deleteAdmin(admin_id);

  res.status(StatusCodes.OK).json(deleteAdmin);
};

const signUpAdmin = async (req, res) => {
  const { userData } = req.body;

  const { name, surname, username, email, password, image } = userData;

  const uniqueEmail = await Admin.findWithEmail(email);

  if (uniqueEmail) {
    throw new BadRequestError(`The email ${email} is already an admin in Readefine.`);
  }

  const uniqueUsername = await Admin.findWithUsername(email);

  if (uniqueUsername) {
    throw new BadRequestError(`The username ${username} has already been taken.`);
  }

  const hashedPassword = await fns.hashPassword(password);

  const admin = new Admin(name, surname, username, email, hashedPassword, image);

  const data = await admin.createAdmin();

  if (!data) {
    throw new BadRequestError(`Error in signing up. Try again later.`);
  }

  const token = fns.createSignUpToken(data.insertId, username, email, "admin");

  res.status(StatusCodes.OK).json({ data, token });

  const mail = await sendVerificationEmail(email, `${name} ${surname}`, token);
};

module.exports = { getAdmin, getAllAdmins, signUpAdmin, deleteAdmin };
