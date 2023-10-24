const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const Head = require("../../../models/users/Head");
const fns = require("../../functionController");
const validator = require("validator");
const { sendVerificationEmail } = require("../mail/verificationMail");

const verifyHead = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new BadRequestError(`You do not have the appropriate credentials to verify your account.`);
  }

  const isExpired = fns.isTokenExpired(token);

  if (isExpired) {
    throw new BadRequestError(`The link for changing the passord has already expired.`);
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

  const { head_id, name, surname, username, email, password, is_verified } = head;

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
    const token = fns.createSignUpToken(user_id, username, email, "user");

    primary.token = `Head Bearer ${token}`;

    res.status(StatusCodes.OK).json({ primary });

    const mail = await sendVerificationEmail(email, `${name} ${surname}`, token);
    return;
  } else {
    const token = fns.createLogInToken(head_id, username, email, "head");

    primary.token = `Head Bearer ${token}`;

    res.status(StatusCodes.OK).json({ primary });
    return;
  }
};

const signUpHead = async (req, res) => {
  const { userData } = req.body;

  console.log(userData);

  const { name, surname, username, email, password, image } = userData;

  const takenUsername = await Head.findWithUsername(email);

  if (takenUsername) {
    throw new BadRequestError(`The username ${username} has already been taken.`);
  }

  const takenEmail = await Head.findWithEmail(email);

  if (takenEmail) {
    throw new BadRequestError(`The email ${email} is already used in Readefine.`);
  }

  const hashedPassword = await fns.hashPassword(password);

  const head = new Head(name, surname, username, email, hashedPassword, image);

  const data = await head.createHead();

  if (!data) {
    throw new BadRequestError(`Error in signing up. Try again later.`);
  }

  const token = fns.createSignUpToken(data.insertId, username, email, "head");

  res.status(StatusCodes.OK).json({ data, token });

  const mail = await sendVerificationEmail(email, `${name} ${surname}`, token);
};

module.exports = { logInHead, signUpHead, verifyHead };
