const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const Riddles = require("../../../models/minigames/Riddles");

const getAllRiddles = async (req, res) => {
  const riddles = await Riddles.getAllRiddles();

  if (!riddles) {
    throw new BadRequestError(`There was a problem in getting all the riddles.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

const getRandomRiddle = async (req, res) => {
  const riddles = await Riddles.getRandomRiddle();

  if (!riddles) {
    throw new BadRequestError(`There was a problem in getting a random riddle.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

module.exports = { getAllRiddles, getRandomRiddle };
