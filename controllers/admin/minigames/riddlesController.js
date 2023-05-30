const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const Riddles = require("../../../models/minigames/Riddles");

const createRiddle = async (req, res) => {
  const { id } = req.user;
  const { riddle, answer } = req.body;

  const riddles = new Riddles(riddle, answer, id);

  const data = await riddles.createRiddle();

  if (!data) {
    throw new BadRequestError(`Error in creating riddle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateRiddle = async (req, res) => {
  const { id } = req.user;
  const { riddle_id } = req.params;
  const { riddle, answer } = req.body;

  const riddles = await Riddles.updateRiddle(riddle_id, riddle, answer, id);

  if (!riddles) {
    throw new BadRequestError(`Error in updating riddle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

const deleteRiddle = async (req, res) => {
  const { riddle_id } = req.params;

  const riddles = await Riddles.deleteRiddle(riddle_id);

  if (!riddles) {
    throw new BadRequestError(`Error in deleting riddle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

const getAllRiddles = async (req, res) => {
  const { searchFilter, sortFilter, dateRangeFilter } = req.query;
  const riddles = await Riddles.getAllRiddles(searchFilter, sortFilter, dateRangeFilter);

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

module.exports = { createRiddle, deleteRiddle, updateRiddle, getAllRiddles, getRiddle };
