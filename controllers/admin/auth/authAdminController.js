const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const Admin = require("../../../models/users/Admin");
const fns = require("../../functionController");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../mail/verificationMail");

const verifyAdmin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new BadRequestError(`You do not have the appropriate credentials to verify your account.`);
  }

  const isExpired = fns.isTokenExpired(token);

  if (isExpired) {
    throw new BadRequestError(`The link for verifying your account has already expired.`);
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET);

  if (!verify) {
    throw new BadRequestError(`You do not have the appropriate credentials to verify your account.`);
  }

  if (!verify?.id || !verify?.username || !verify?.email || !verify?.role) {
    throw new BadRequestError(`You do not have the appropriate credentials to verify your account.`);
  }

  const admin = await Admin.verifyAdmin(verify.id);

  if (!admin) {
    throw new BadRequestError(`Error in verifying your account. Try again later.`);
  }

  res.status(StatusCodes.OK).json(admin);
};

const logInAdmin = async (req, res) => {
  const { loginData } = req.body;

  const { candidateIdentifier, candidatePassword } = loginData;

  let admin = null;

  if (validator.isEmail(candidateIdentifier)) {
    admin = await Admin.findWithEmail(candidateIdentifier);
  } else {
    admin = await Admin.findWithUsername(candidateIdentifier);
  }

  if (!admin) {
    throw new NotFoundError(`There is no admin with the given identifier.`);
  }

  const { admin_id, name, surname, username, email, password, is_verified } = admin;

  const isMatch = await fns.isMatchedPassword(password, candidatePassword);

  if (!isMatch) {
    throw new BadRequestError(`The email and password does not match.`);
  }

  const primary = {
    adminId: admin_id,
    name: name,
    surname: surname,
    username: username,
    token: null,
    email: email,
    role: "admin",
    isVerified: is_verified,
  };

  if (!is_verified) {
    const token = fns.createSignUpToken(admin_id, username, email, "admin");

    primary.token = `Admin Bearer ${token}`;

    res.status(StatusCodes.OK).json({ primary });

    const mail = await sendVerificationEmail(email, `${name} ${surname}`, token);
    return;
  } else {
    const token = fns.createLogInToken(admin_id, username, email, "admin");

    primary.token = `Admin Bearer ${token}`;

    res.status(StatusCodes.OK).json({ primary });

    return;
  }
};

module.exports = { logInAdmin, verifyAdmin };
