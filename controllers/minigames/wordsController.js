const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../../errors");
const Words = require("../../models/minigames/Words");

const createWord = async (req, res) => {
  const { id } = req.user;
  const { word, definition, syllable, part_of_speech, pronunciation, usage } = req.body;

  const words = new Words(word, definition, syllable, part_of_speech, pronunciation, usage, id);

  if (!words) {
    throw new BadRequestError(`Error in addin word. Try again later.`);
  }

  res.status(StatusCodes.OK).json(words);
};

const updateWord = async (req, res) => {
  const { word_id } = req.params;
  const { id } = req.user;
  const { word, definition, syllable, part_of_speech, pronunciation, usage } = req.body;

  const words = await Words.updateWord(
    word_id,
    word,
    definition,
    syllable,
    part_of_speech,
    pronunciation,
    usage,
    id
  );

  if (!words) {
    throw new BadRequestError(`Error in updating word. Try again later.`);
  }

  res.status(StatusCodes.OK).json(words);
};

const deleteWord = async (req, res) => {
  const { word_id } = req.params;

  const words = await Words.deleteWord(word_id);

  if (!words) {
    throw new BadRequestError(`Error in deleting word. Try again later.`);
  }

  res.status(StatusCodes.OK).json(words);
};

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

module.exports = { createWord, updateWord, deleteWord, getAllWords, getWord };
