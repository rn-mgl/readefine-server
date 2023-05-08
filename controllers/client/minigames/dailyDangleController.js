const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const DailyDangle = require("../../../models/minigames/DailyDangle");

const getDailyDangle = async (req, res) => {
  const { dangle_id } = req.params;

  const dangle = await DailyDangle.getDailyDangle(dangle_id);

  if (!dangle) {
    throw new BadRequestError(`Error in getting daily dangle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(dangle);
};

module.exports = { getDailyDangle };
