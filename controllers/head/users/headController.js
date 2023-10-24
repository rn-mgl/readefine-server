const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../../../errors");
const Head = require("../../../models/users/Head");
const { hashPassword, isMatchedPassword } = require("../../functionController");

const findWithEmail = async (req, res) => {
  const { email } = req.user;

  const user = await Head.findWithEmail(email);

  if (!user) {
    throw new NotFoundError(`There is no head with the given email.`);
  }

  res.status(StatusCodes.OK).json(user);
};

const getAllHeads = async (req, res) => {
  const head = await Head.getAllHeads();

  if (!head) {
    throw new BadRequestError(`There was a problem in getting all the heads.`);
  }

  res.status(StatusCodes.OK).json(head);
};

const getHead = async (req, res) => {
  const { head_id } = req.params;

  const { id } = req.user;

  if (parseInt(head_id) !== id) {
    throw new UnauthorizedError(`You are not allowed to get other's data.`);
  }

  const head = await Head.getHead(head_id);

  if (!head) {
    throw new NotFoundError(`The head you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(head);
};

const updateHead = async (req, res) => {
  const { type } = req.body;

  const { head_id } = req.params;
  const { id } = req.user;

  if (parseInt(head_id) !== id) {
    throw new UnauthorizedError(`You are not allowed to change other's data.`);
  }

  const ifExist = await Head.getHead(head_id);

  if (!ifExist) {
    throw new NotFoundError(`The head you are trying to update does not exist.`);
  }

  if (type === "main") {
    const { image, name, surname, username } = req.body;

    const ifUsernameTaken = await Head.findWithUsername(username);

    if (ifUsernameTaken && ifUsernameTaken.head_id !== id) {
      throw new BadRequestError(`The username is already taken.`);
    }

    const data = await Head.updateHead(head_id, image, name, surname, username);

    if (!data) {
      throw new BadRequestError(`Error in updating head. Try again later.`);
    }

    res.status(StatusCodes.OK).json(data);

    return;
  } else if (type === "password") {
    const { oldPassword, newPassword } = req.body;

    const headData = await Head.getHead(id);

    if (!headData) {
      throw new BadRequestError(`Error in getting head. Try again later.`);
    }

    const { password } = headData;

    const isCorrectOldPassword = await isMatchedPassword(password, oldPassword);

    if (!isCorrectOldPassword) {
      throw new BadRequestError(`The old password you entered is incorrect.`);
    }

    const hashedPassword = await hashPassword(newPassword);

    const changedPassword = await Head.changePassword(id, hashedPassword);

    if (!changedPassword) {
      throw new BadRequestError(`Error in changing password. Try again later.`);
    }

    res.status(StatusCodes.OK).json(changedPassword);
  }
};

module.exports = { findWithEmail, getHead, getAllHeads, updateHead };
