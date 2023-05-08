const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../../errors");
const Words = require("../../../models/minigames/Words");

const getAllWords = async (req, res) => {
  const words = await Words.getAllWords();

  if (!words) {
    throw new BadRequestError(`Error in getting all words. Try again later.`);
  }

  res.status(StatusCodes.OK).json(words);
};

const getWord = async (req, res) => {
  const { word_id } = req.params;

  const word = await Words.getWord(word_id);

  if (!word) {
    throw new BadRequestError(`Error in getting word. Try again later.`);
  }

  res.status(StatusCodes.OK).json(word);
};

module.exports = { getAllWords, getWord };
