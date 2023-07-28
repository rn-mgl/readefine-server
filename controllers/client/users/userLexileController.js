const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const UserLexile = require("../../../models/users/UserLexile");

const getLatestLexile = async (req, res) => {
  const { id } = req.user;

  const lexile = await UserLexile.getLatestLexile(id);

  if (!lexile) {
    throw new BadRequestError(`There was a problem in getting your Lexile level.`);
  }

  res.status(StatusCodes.OK).json(lexile);
};

module.exports = { getLatestLexile };
