const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const UserLexile = require("../../../models/users/UserLexile");

const getLexileProgress = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  const data = await UserLexile.getLexileProgress(userId);

  if (!data) {
    throw new BadRequestError(`Error in getting user progress. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getLexileProgress };
