const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");
const Admin = require("../../models/users/Admin");
const fns = require("../functionController");
const validator = require("validator");

const verifyAdmin = async (req, res) => {
  const { id } = req.user;

  const admin = await Admin.verifyAdmin(id);

  if (!admin) {
    throw new BadRequestError(`Error in verifying your account. Try again later.`);
  }

  res.status(StatusCodes.OK).json(admin);
};

const logInAdmin = async (req, res) => {
  const { loginData } = req.body;

  const { candidateIdentifier, candidatePassword } = loginData;

  if (validator.isEmail(candidateIdentifier)) {
    const user = await Admin.findWithEmail(candidateIdentifier);

    if (!user) {
      throw new NotFoundError(`There is no user with the given email.`);
    }

    const { admin_id, username, email, password } = user;

    const isMatch = await fns.isMatchedPassword(password, candidatePassword);

    if (!isMatch) {
      throw new BadRequestError(`The email and password does not match.`);
    }

    const token = fns.createToken(admin_id, username, email);

    const primary = {
      admin_id: user.admin_id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      token: `Admin Bearer ${token}`,
      email: user.email,
    };

    res.status(StatusCodes.OK).json({ primary });

    return;
  } else {
    const user = await Admin.findWithUsername(candidateIdentifier);

    if (!user) {
      throw new NotFoundError(`There is no user with the given username.`);
    }

    const { admin_id, username, email, password } = user;

    const isMatch = await fns.isMatchedPassword(password, candidatePassword);

    if (!isMatch) {
      throw new BadRequestError(`The email and password does not match.`);
    }

    const token = fns.createToken(admin_id, username, email);

    const primary = {
      admin_id: user.admin_id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      token: `Admin Bearer ${token}`,
      email: user.email,
    };

    res.status(StatusCodes.OK).json({ primary });

    return;
  }
};

const signUpAdmin = async (req, res) => {
  const { userData } = req.body;

  const { name, surname, username, email, password } = userData;

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

module.exports = { logInAdmin, signUpAdmin, verifyAdmin };
