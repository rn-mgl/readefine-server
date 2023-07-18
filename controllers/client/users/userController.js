const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../../../errors");
const User = require("../../../models/users/User");
const UserLexile = require("../../../models/users/UserLexile");
const lexile = require("../../../lexileMap");
const { isMatchedPassword, hashPassword } = require("../../functionController");

const findWithEmail = async (req, res) => {
  const { email } = req.user;

  const user = await User.findWithEmail(email);

  if (!user) {
    throw new NotFoundError(`There is no account with the given email.`);
  }

  res.status(StatusCodes.OK).json(user);
};

const getUser = async (req, res) => {
  const { user_id } = req.params;
  const { id } = req.user;

  if (parseInt(user_id) !== id) {
    throw new UnauthorizedError(`You can only access your own information.`);
  }

  const user = await User.getUser(user_id);

  if (!user) {
    throw new BadRequestError(`Error in getting user. Try again later.`);
  }

  res.status(StatusCodes.OK).json(user);
};

const updateUser = async (req, res) => {
  const { type } = req.body;
  const { id } = req.user;
  const { user_id } = req.params;

  if (parseInt(user_id) !== id) {
    throw new UnauthorizedError(`You can only access your own information.`);
  }

  if (type === "main") {
    const { name, surname, username, image } = req.body;
    const { user_id } = req.params;

    const data = await User.updateUser(user_id, name, surname, username, image);

    if (!data) {
      throw new BadRequestError(`Error in updating your profile. Try again later.`);
    }

    res.status(StatusCodes.OK).json(data);
    return;
  } else if (type === "grade") {
    const { chosenGrade } = req.body;
    const { user_id } = req.params;

    const data = await User.updateGradeLevel(user_id, chosenGrade);

    if (!data) {
      throw new BadRequestError(`Error in updating your grade level. Try again later.`);
    }

    const lexileLevel = lexile[chosenGrade];

    const newLexile = new UserLexile(user_id, lexileLevel);

    const lexileData = await newLexile.createLexile();

    if (!lexileData) {
      throw new BadRequestError(`Error in updating your lexile level. Try again later.`);
    }

    res.status(StatusCodes.OK).json(data);
    return;
  } else if (type === "password") {
    const { oldPassword, newPassword } = req.body;

    const userData = await User.getUser(id);

    if (!userData) {
      throw new BadRequestError(`Error in getting user. Try again later.`);
    }

    const { password } = userData;

    const isCorrectOldPassword = await isMatchedPassword(password, oldPassword);

    if (!isCorrectOldPassword) {
      throw new BadRequestError(`The old password you entered is incorrect.`);
    }

    const hashedPassword = await hashPassword(newPassword);

    const changedPassword = await User.changePassword(id, hashedPassword);

    if (!changedPassword) {
      throw new BadRequestError(`Error in changing password. Try again later.`);
    }

    res.status(StatusCodes.OK).json(changedPassword);
  }
};

module.exports = { findWithEmail, getUser, updateUser };
