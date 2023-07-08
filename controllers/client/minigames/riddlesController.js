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

const getRandomRiddle = async (req, res) => {
  const riddles = await Riddles.getRandomRiddle();

  if (!riddles) {
    throw new BadRequestError(`Error in getting random riddle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

module.exports = { getAllRiddles, getRandomRiddle };
