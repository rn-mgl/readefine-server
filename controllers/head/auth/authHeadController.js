const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const Head = require("../../../models/users/Head");
const fns = require("../../functionController");
const validator = require("validator");
const { sendVerificationEmail } = require("../mail/verificationMail");
const jwt = require("jsonwebtoken");

const verifyHead = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new BadRequestError(
      `You do not have the appropriate credentials to verify your account.`
    );
  }

  const isExpired = fns.isTokenExpired(token);

  if (isExpired) {
    throw new BadRequestError(
      `The link for changing the passord has already expired.`
    );
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET);

  if (!verify) {
    throw new BadRequestError(
      `You do not have the appropriate credentials to verify your account.`
    );
  }

  if (!verify?.id || !verify?.username || !verify?.email || !verify?.role) {
    throw new BadRequestError(
      `You do not have the appropriate credentials to verify your account.`
    );
  }

  const head = await Head.verifyHead(verify.id);

  if (!head) {
    throw new BadRequestError(
      `Error in verifying your account. Try again later.`
    );
  }

  res.status(StatusCodes.OK).json(head);
};

const logInHead = async (req, res) => {
  const { loginData } = req.body;

  const { candidateIdentifier, candidatePassword } = loginData;

  let head = null;

  if (validator.isEmail(candidateIdentifier)) {
    head = await Head.findWithEmail(candidateIdentifier);
  } else {
    head = await Head.findWithUsername(candidateIdentifier);
  }

  if (!head) {
    throw new NotFoundError(`There is no user with the given email.`);
  }

  const { head_id, name, surname, username, email, password, is_verified } =
    head;

  const isMatch = await fns.isMatchedPassword(password, candidatePassword);

  if (!isMatch) {
    throw new BadRequestError(`The email and password does not match.`);
  }

  const primary = {
    headId: head_id,
    name: name,
    surname: surname,
    username: username,
    token: null,
    email: email,
    role: "head",
    isVerified: is_verified,
  };

  if (!is_verified) {
    const token = fns.createSignUpToken(head_id, username, email, "user");

    primary.token = `Head Bearer ${token}`;

    res.status(StatusCodes.OK).json({ primary });

    const mail = await sendVerificationEmail(
      email,
      `${name} ${surname}`,
      token
    );
    return;
  } else {
    const token = fns.createLogInToken(head_id, username, email, "head");

    primary.token = `Head Bearer ${token}`;

    res.status(StatusCodes.OK).json({ primary });
    return;
  }
};

module.exports = { logInHead, verifyHead };
