const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const DailyDecipher = require("../../../models/minigames/DailyDecipher");

const createDecipher = async (req, res) => {
  const { word_id } = req.body;

  const decipher = new DailyDecipher(word_id);

  const data = await decipher.createDecipher();

  if (!data) {
    throw new BadRequestError(`Error in adding daily decipher. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const deleteDecipher = async (req, res) => {
  const { decipher_id } = req.params;

  const decipher = await DailyDecipher.deleteDecipher(decipher_id);

  if (!decipher) {
    throw new BadRequestError(`Error in deleting daily decipher. Try again later.`);
  }

  res.status(StatusCodes.OK).json(decipher);
};

const updateDecipher = async (req, res) => {
  const { decipher_id } = req.params;
  const { word_id } = req.body;

  const decipher = await DailyDecipher.updateDecipher(word_id, decipher_id);

  if (!decipher) {
    throw new BadRequestError(`Error in updating daily decipher. Try again later.`);
  }

  res.status(StatusCodes.OK).json(decipher);
};

const getDailyDecipher = async (req, res) => {
  const { decipher_id } = req.params;

  const decipher = await DailyDecipher.getDailyDecipher(decipher_id);

  if (!decipher) {
    throw new BadRequestError(`Error in getting daily decipher. Try again later.`);
  }

  res.status(StatusCodes.OK).json(decipher);
};

const getAllDailyDeciphers = async (req, res) => {
  const decipher = await DailyDecipher.getAllDailyDeciphers();

  if (!decipher) {
    throw new BadRequestError(`Error in getting all daily deciphers. Try again later.`);
  }

  res.status(StatusCodes.OK).json(decipher);
};

module.exports = {
  createDecipher,
  deleteDecipher,
  updateDecipher,
  getAllDailyDeciphers,
  getDailyDecipher,
};
