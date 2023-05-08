const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");
const User = require("../../models/users/User");
const fns = require("../functionController");

const verifyUser = async (req, res) => {
  const { id } = req.user;

  const user = await User.verifyUser(id);

  if (!user) {
    throw new BadRequestError(`Error in verifying your account. Try again later.`);
  }

  res.status(StatusCodes.OK).json(user);
};

const logInUser = async (req, res) => {
  const { candidateEmail, candidatePassword } = req.body;

  const user = await User.findWithEmail(candidateEmail);

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
};

const signUpUser = async (req, res) => {
  const { name, surname, username, grade_level, email, password } = req.body;

  const uniqueEmail = await fns.isUniqueUserEmail(email);

  if (!uniqueEmail) {
    throw new BadRequestError(`The email has already been taken.`);
  }

  const hashedPassword = await fns.hashPassword(password);

  const lexile_level = fns.getLexile(grade_level);

  const user = new User(name, surname, username, grade_level, lexile_level, email, hashedPassword);

  const data = await user.createUser();

  if (!data) {
    throw new BadRequestError(`Error in signing up. Try again later.`);
  }

  const token = fns.createToken(data.insertId);

  res.status(StatusCodes.OK).json({ data, token });
};

module.exports = { logInUser, signUpUser, verifyUser };
