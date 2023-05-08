const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const Riddles = require("../../../models/minigames/Riddles");

const getAllRiddles = async (req, res) => {
  const riddles = await Riddles.getAllRiddles();

  if (!riddles) {
    throw new BadRequestError(`Error in deleting riddle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

const getRiddle = async (req, res) => {
  const { riddle_id } = req.params;

  const riddles = await Riddles.getRiddle(riddle_id);

  if (!riddles) {
    throw new BadRequestError(`Error in deleting riddle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

module.exports = { getAllRiddles, getRiddle };
