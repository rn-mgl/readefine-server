const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");
const Admin = require("../../models/users/Admin");
const fns = require("../functionController");

const logInAdmin = async (req, res) => {
  const { candidateEmail, candidatePassword } = req.body;

  const admin = await Admin.findWithEmail(candidateEmail);

  if (!admin) {
    throw new NotFoundError(`There is no admin with the given email.`);
  }

  const { admin_id, username, email, password } = admin;

  const isMatch = await fns.isMatchedPassword(password, candidatePassword);

  if (!isMatch) {
    throw new BadRequestError(`The email and password does not match.`);
  }

  const token = fns.createToken(admin_id, username, email);

  res.status(StatusCodes.OK).json({ admin, token });
};

const signUpAdmin = async (req, res) => {
  const { name, surname, username, email, password } = req.body;

  const uniqueEmail = await fns.isUniqueAdminEmail(email);

  if (!uniqueEmail) {
    throw new BadRequestError(`The email has already been taken.`);
  }

  const hashedPassword = await fns.hashPassword(password);

  const admin = new Admin(name, surname, username, email, hashedPassword);

  const data = await admin.createAdmin();

  if (!data) {
    throw new BadRequestError(`Error in signing up. Try again later.`);
  }

  const token = fns.createToken(data.insertId);

  res.status(StatusCodes.OK).json({ data, token });
};

module.exports = { logInAdmin, signUpAdmin };
