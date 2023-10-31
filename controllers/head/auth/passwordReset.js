const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const { sendPasswordResetEmail } = require("../mail/passwordResetMail");
const Head = require("../../../models/users/Head");
const { createSignUpToken, hashPassword, isTokenExpired } = require("../../functionController");
const jwt = require("jsonwebtoken");

const sendPasswordReset = async (req, res) => {
  const { candidateEmail, candidateUsername } = req.body;

  if (!candidateEmail || !candidateUsername) {
    throw new BadRequestError(`No email or username entered. You could not proceed.`);
  }

  const headEmail = await Head.findWithEmail(candidateEmail);

  if (!headEmail) {
    throw new NotFoundError(`Sorry, there is no head found with the given email and username.`);
  }

  const headUsername = await Head.findWithUsername(candidateUsername);

  if (!headUsername) {
    throw new NotFoundError(`Sorry, there is no head found with the given email and username.`);
  }

  const { head_id, name, surname, email, username } = headEmail;

  if (username !== candidateUsername) {
    throw new BadRequestError(`The email you entered does not use the username you entered.`);
  }

  const token = createSignUpToken(head_id, username, email, "head");

  const mail = await sendPasswordResetEmail(email, `${name} ${surname}`, token);

  if (!mail) {
    throw new BadRequestError(`Error in sending password reset mail. Try again later.`);
  }

  res.status(StatusCodes.OK).json(token);
};

const changePassword = async (req, res) => {
  const { newPassword, retypedPassword } = req.body;
  const { head_token } = req.params;

  if (!head_token) {
    throw new BadRequestError(`You are not authorized to change this user's password.`);
  }

  const isExpired = isTokenExpired(head_token);

  if (isExpired) {
    throw new BadRequestError(`The link for changing the passord has already expired.`);
  }

  const verify = jwt.verify(head_token, process.env.JWT_SECRET);

  if (!verify) {
    throw new BadRequestError(`You do not have the appropriate credentials to change a password.`);
  }

  if (!verify?.id || !verify?.username || !verify?.email || !verify?.role) {
    throw new BadRequestError(`You do not have the appropriate credentials to change a password.`);
  }

  const { id, username, email, role } = verify;

  if (newPassword !== retypedPassword) {
    throw new BadRequestError(`The new and retyped passwords do not match. Try again.`);
  }

  const hashedPassword = await hashPassword(newPassword);

  const user = await Head.changePassword(id, hashedPassword);

  if (!user) {
    throw new BadRequestError(`Error in changing password. Try again later.`);
  }

  res.status(StatusCodes.OK).json(user);
};

module.exports = { sendPasswordReset, changePassword };
