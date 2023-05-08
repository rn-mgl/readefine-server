const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const DailyDangle = require("../../../models/minigames/DailyDangle");

const createDangle = async (req, res) => {
  const { word_id } = req.body;

  const dangle = new DailyDangle(word_id);

  const data = await dangle.createDangle();

  if (!data) {
    throw new BadRequestError(`Error in adding daily dangle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const deleteDangle = async (req, res) => {
  const { dangle_id } = req.params;

  const dangle = await DailyDangle.deleteDangle(dangle_id);

  if (!dangle) {
    throw new BadRequestError(`Error in deleting daily dangle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(dangle);
};

const updateDangle = async (req, res) => {
  const { dangle_id } = req.params;
  const { word_id } = req.body;

  const dangle = await DailyDangle.updateDangle(word_id, dangle_id);

  if (!dangle) {
    throw new BadRequestError(`Error in updating daily dangle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(dangle);
};

const getDailyDangle = async (req, res) => {
  const { dangle_id } = req.params;

  const dangle = await DailyDangle.getDailyDangle(dangle_id);

  if (!dangle) {
    throw new BadRequestError(`Error in getting daily dangle. Try again later.`);
  }

  res.status(StatusCodes.OK).json(dangle);
};

const getAllDailyDangles = async (req, res) => {
  const dangle = await DailyDangle.getAllDailyDangles();

  if (!dangle) {
    throw new BadRequestError(`Error in getting all daily dangles. Try again later.`);
  }

  res.status(StatusCodes.OK).json(dangle);
};

module.exports = { createDangle, deleteDangle, updateDangle, getAllDailyDangles, getDailyDangle };
