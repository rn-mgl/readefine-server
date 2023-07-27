const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const Riddles = require("../../../models/minigames/Riddles");

const createRiddle = async (req, res) => {
  const { id } = req.user;
  const { riddle, answer } = req.body;

  const riddles = new Riddles(riddle, answer, id);

  const data = await riddles.createRiddle();

  if (!data) {
    throw new BadRequestError(`There was a problem in creating the riddle ${answer}.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateRiddle = async (req, res) => {
  const { id } = req.user;
  const { riddle_id } = req.params;
  const { riddle, answer } = req.body;

  const ifExist = await Riddles.getRiddle(riddle_id);

  if (!ifExist) {
    throw new NotFoundError(`The riddle you are trying to update does not exist.`);
  }

  const riddles = await Riddles.updateRiddle(riddle_id, riddle, answer, id);

  if (!riddles) {
    throw new BadRequestError(`There was a problem in updating the riddle ${answer}.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

const deleteRiddle = async (req, res) => {
  const { riddle_id } = req.params;

  const ifExist = await Riddles.getRiddle(riddle_id);

  if (!ifExist) {
    throw new NotFoundError(`The riddle you are trying to update does not exist.`);
  }

  const riddles = await Riddles.deleteRiddle(riddle_id);

  if (!riddles) {
    throw new BadRequestError(`There was a problem in deleting the riddle.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

const getAllRiddles = async (req, res) => {
  const { searchFilter, sortFilter, dateRangeFilter } = req.query;
  const riddles = await Riddles.getAllRiddles(searchFilter, sortFilter, dateRangeFilter);

  if (!riddles) {
    throw new BadRequestError(`There was a problem in getting all riddles.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

const getRiddle = async (req, res) => {
  const { riddle_id } = req.params;

  const riddles = await Riddles.getRiddle(riddle_id);

  if (!riddles) {
    throw new NotFoundError(`The riddle you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(riddles);
};

const getRandomRiddle = async (req, res) => {
  const riddle = await Riddles.getRandomRiddle();

  if (!riddle) {
    throw new BadRequestError(`There was a problem in getting a random riddle.`);
  }

  res.status(StatusCodes.OK).json(riddle);
};

module.exports = {
  createRiddle,
  deleteRiddle,
  updateRiddle,
  getAllRiddles,
  getRiddle,
  getRandomRiddle,
};
