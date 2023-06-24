const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const UserLexile = require("../../../models/users/UserLexile");

const getLatestLexile = async (req, res) => {
  const { id } = req.user;

  const lexile = await UserLexile.getLatestLexile(id);

  if (!lexile) {
    throw new BadRequestError(`Error in getting your Lexile. Try again later.`);
  }

  res.status(StatusCodes.OK).json(lexile);
};

module.exports = { getLatestLexile };
