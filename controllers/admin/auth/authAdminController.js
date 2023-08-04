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
    throw new BadRequestError(`You do not have the appropriate credentials to change a password.`);
  }

  const isExpired = fns.isTokenExpired(token);

  if (isExpired) {
    throw new BadRequestError(`The link for changing the passord has already expired.`);
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET);

  if (!verify) {
    throw new BadRequestError(`You do not have the appropriate credentials to change a password.`);
  }

  if (!verify?.id || !verify?.username || !verify?.email || !verify?.role) {
    throw new BadRequestError(`You do not have the appropriate credentials to change a password.`);
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

  if (validator.isEmail(candidateIdentifier)) {
    const admin = await Admin.findWithEmail(candidateIdentifier);

    if (!admin) {
      throw new NotFoundError(`There is no user with the given email.`);
    }

    const { admin_id, name, surname, username, email, password, is_verified } = admin;

    const isMatch = await fns.isMatchedPassword(password, candidatePassword);

    if (!isMatch) {
      throw new BadRequestError(`The email and password does not match.`);
    }

    if (!is_verified) {
      const token = fns.createSignUpToken(admin_id, username, email, "admin");

      const primary = {
        adminId: admin_id,
        name: name,
        surname: surname,
        username: username,
        token: `Admin Bearer ${token}`,
        email: email,
        role: "admin",
        isVerified: is_verified,
      };

      res.status(StatusCodes.OK).json({ primary });

      const mail = await sendVerificationEmail(email, `${name} ${surname}`, token);
      return;
    } else {
      const token = fns.createLogInToken(admin_id, username, email, "admin");

      const primary = {
        adminId: admin_id,
        name: name,
        surname: surname,
        username: username,
        token: `Admin Bearer ${token}`,
        email: email,
        role: "admin",
        isVerified: is_verified,
      };

      res.status(StatusCodes.OK).json({ primary });

      return;
    }
  } else {
    const admin = await Admin.findWithUsername(candidateIdentifier);

    if (!admin) {
      throw new NotFoundError(`There is no user with the given username.`);
    }

    const { admin_id, name, surname, username, email, password, is_verified } = admin;

    const isMatch = await fns.isMatchedPassword(password, candidatePassword);

    if (!isMatch) {
      throw new BadRequestError(`The username and password does not match.`);
    }

    if (!is_verified) {
      const token = fns.createSignUpToken(admin_id, username, email, "admin");

      const primary = {
        adminId: admin_id,
        name: name,
        surname: surname,
        username: username,
        token: `Admin Bearer ${token}`,
        email: email,
        role: "admin",
        isVerified: is_verified,
      };

      res.status(StatusCodes.OK).json({ primary });

      const mail = await sendVerificationEmail(email, `${name} ${surname}`, token);
      return;
    } else {
      const token = fns.createLogInToken(admin_id, username, email, "admin");

      const primary = {
        adminId: admin_id,
        name: name,
        surname: surname,
        username: username,
        token: `Admin Bearer ${token}`,
        email: email,
        role: "admin",
        isVerified: is_verified,
      };

      res.status(StatusCodes.OK).json({ primary });

      return;
    }
  }
};

const signUpAdmin = async (req, res) => {
  const { userData } = req.body;

  const { name, surname, username, email, password } = userData;

  const uniqueUsername = await Admin.findWithUsername(email);

  if (uniqueUsername) {
    throw new BadRequestError(`The username ${username} has already been taken.`);
  }

  const uniqueEmail = await Admin.findWithEmail(email);

  if (uniqueEmail) {
    throw new BadRequestError(`The email ${email} is already used in Readefine.`);
  }

  const hashedPassword = await fns.hashPassword(password);

  const admin = new Admin(name, surname, username, email, hashedPassword);

  const data = await admin.createAdmin();

  if (!data) {
    throw new BadRequestError(`Error in signing up. Try again later.`);
  }

  const token = fns.createSignUpToken(data.insertId, username, email, "admin");

  res.status(StatusCodes.OK).json({ data, token });
};

module.exports = { logInAdmin, signUpAdmin, verifyAdmin };
