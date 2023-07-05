const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Words = require("../../../models/words/Words");

const getAllWords = async (req, res) => {
  const words = await Words.getAllWords();

  if (!words) {
    throw new BadRequestError(`Error in getting all words. Try again later.`);
  }

  res.status(StatusCodes.OK).json(words);
};

const getRandomWord = async (req, res) => {
  const word = await Words.getRandomWord();

  if (!word) {
    throw new BadRequestError(`Error in getting random word. Try again later.`);
  }

  res.status(StatusCodes.OK).json(word);
};

module.exports = { getAllWords, getRandomWord };
