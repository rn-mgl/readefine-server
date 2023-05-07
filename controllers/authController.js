const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const User = require("../models/users/User");
const fns = require("./function");

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
  const { name, surname, username, grade_level, lexile_level, email, password } = req.body;

  const hashedPassword = await fns.hashPassword(password);

  const uniqueEmail = await fns.isUniqueEmail(email);

  if (!uniqueEmail) {
    throw new BadRequestError(`The email has already been taken.`);
  }

  const user = new User(name, surname, username, grade_level, lexile_level, email, hashedPassword);

  const data = await user.createUser();

  if (!data) {
    throw new BadRequestError(`Error in signin up. Try again later.`);
  }

  const token = fns.createToken(data.insertId);

  res.status(StatusCodes.OK).json({ data, token });
};

module.exports = { logInUser, signUpUser };
