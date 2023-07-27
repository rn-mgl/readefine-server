const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const UserLexile = require("../../../models/users/UserLexile");
const User = require("../../../models/users/User");

const getLexileProgress = async (req, res) => {
  const { userId } = req.query;

  const ifExist = await User.getUser(userId);

  if (!ifExist) {
    throw new NotFoundError(`The user you are trying to view does not exist.`);
  }

  const data = await UserLexile.getLexileProgress(userId);

  if (!data) {
    throw new BadRequestError(`There was a problem in getting the user's lexile progress.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getLexileProgress };
