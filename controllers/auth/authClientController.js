const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");
const User = require("../../models/users/User");
const { sendVerifiationEmail } = require("../client/mail/verificationMail");
const fns = require("../functionController");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res) => {
  const { token } = req.body;

  const verify = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.verifyUser(verify.id);

  if (!user) {
    throw new BadRequestError(`Error in verifying your account. Try again later.`);
  }

  res.status(StatusCodes.OK).json(user);
};

const logInUser = async (req, res) => {
  const { loginData } = req.body;

  const { candidateIdentifier, candidatePassword } = loginData;

  if (validator.isEmail(candidateIdentifier)) {
    const user = await User.findWithEmail(candidateIdentifier);

    if (!user) {
      throw new NotFoundError(`There is no user with the given email.`);
    }

    const { user_id, username, email, password } = user;

    const isMatch = await fns.isMatchedPassword(password, candidatePassword);

    if (!isMatch) {
      throw new BadRequestError(`The email and password does not match.`);
    }

    const token = fns.createToken(user_id, username, email);

    res.status(StatusCodes.OK).json({ user, token });

    return;
  } else {
    const user = await User.findWithUsername(candidateIdentifier);

    if (!user) {
      throw new NotFoundError(`There is no user with the given username.`);
    }

    const { user_id, username, email, password } = user;

    const isMatch = await fns.isMatchedPassword(password, candidatePassword);

    if (!isMatch) {
      throw new BadRequestError(`The email and password does not match.`);
    }

    const token = fns.createToken(user_id, username, email);

    res.status(StatusCodes.OK).json({ user, token });

    return;
  }
};

const signUpUser = async (req, res) => {
  const { userData } = req.body;
  const { name, surname, username, gradeLevel, email, password } = userData;

  const uniqueEmail = await fns.isUniqueUserEmail(email);

  if (uniqueEmail) {
    throw new BadRequestError(`The email has already been taken.`);
  }

  const hashedPassword = await fns.hashPassword(password);

  const lexileLevel = fns.getLexile(gradeLevel);

  const user = new User(name, surname, username, gradeLevel, lexileLevel, email, hashedPassword);

  const data = await user.createUser();

  if (!data) {
    throw new BadRequestError(`Error in signing up. Try again later.`);
  }

  const token = fns.createToken(data.insertId, username, email);

  res.status(StatusCodes.OK).json({ data, token });

  const mail = await sendVerifiationEmail(email, `${name} ${surname}`, token);
};

module.exports = { logInUser, signUpUser, verifyUser };
