const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const DailyDecipher = require("../../../models/minigames/DailyDecipher");

const getDailyDecipher = async (req, res) => {
  const { decipher_id } = req.params;

  const decipher = await DailyDecipher.getDailyDecipher(decipher_id);

  if (!decipher) {
    throw new BadRequestError(`Error in getting daily decipher. Try again later.`);
  }

  res.status(StatusCodes.OK).json(decipher);
};

module.exports = {
  getDailyDecipher,
};
