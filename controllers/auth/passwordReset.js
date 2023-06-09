const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
const { sendPasswordResetEmail } = require("../client/mail/passwordResetMail");
const User = require("../../models/users/User");
const { createToken, hashPassword } = require("../functionController");
const jwt = require("jsonwebtoken");

const sendPasswordReset = async (req, res) => {
  const { candidateEmail, candidateUsername } = req.body;

  if (!candidateEmail || !candidateUsername) {
    throw new BadRequestError(`No email or username entered. You could not proceed.`);
  }

  const user = await User.findWithEmail(candidateEmail);

  if (!user) {
    throw new NotFoundError(`Sorry, there is no user found with the given email and username.`);
  }

  const { user_id, name, surname, email, username } = user;

  if (username !== candidateUsername) {
    throw new BadRequestError(`The email you entered does not use the username you entered.`);
  }

  const token = createToken(user_id, username, email);

  const mail = await sendPasswordResetEmail(email, `${name} ${surname}`, token);

  if (!mail) {
    throw new BadRequestError(`Error in sending password reset mail. Try again later.`);
  }

  res.status(StatusCodes.OK).json(token);
};

const changePassword = async (req, res) => {
  const { newPassword, retypedPassword } = req.body;
  const { token } = req.params;

  if (!token) {
    throw new BadRequestError(`You are not authorized to change this user's password.`);
  }

  if (newPassword !== retypedPassword) {
    throw new BadRequestError(`The new and retyped passwords do not match. Try again.`);
  }

  const hashedPassword = await hashPassword(newPassword);
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.changePassword(id, hashedPassword);

  if (!user) {
    throw new BadRequestError(`Error in changing password. Try again later.`);
  }

  res.status(StatusCodes.OK).json(user);
};

module.exports = { sendPasswordReset, changePassword };
