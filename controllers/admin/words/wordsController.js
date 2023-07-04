const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Words = require("../../../models/words/Words");
const WordDefinition = require("../../../models/words/WordDefinition");
const WordPartOfSpeech = require("../../../models/words/WordPartOfSpeech");

const addWord = async (req, res) => {
  const { id } = req.user;
  const { data } = req.body;
  const { word, phonetics, meanings } = data;

  let phonetic = "";

  for (let i = 0; i < phonetics.length; i++) {
    const p = phonetics[i];

    if (p.text) {
      phonetic = p.text;
      break;
    }
  }

  phonetic = phonetic ? phonetic : "---";

  const newWord = new Words(word, phonetic, id);
  const createWord = await newWord.addWord();

  if (!createWord) {
    throw new BadRequestError(`Error in creating word. Try again later.`);
  }

  meanings.map(async (m) => {
    let definition,
      example = "";

    for (let j = 0; j < m.definitions?.length; j++) {
      const d = m.definitions[j];
      if (d.definition) {
        definition = d.definition;
        example = d.example ? d.example : null;
        break;
      }
    }

    const newDefinition = new WordDefinition(createWord.insertId, definition, example, id);
    const createDefinition = await newDefinition.addDefinition();

    if (!createDefinition) {
      throw new BadRequestError(`Error in creating definition. Try again later.`);
    }

    const newPartOfSpeech = new WordPartOfSpeech(createDefinition.insertId, m.partOfSpeech, id);
    const createPartOfSpeech = await newPartOfSpeech.addPartOfSpeech();

    if (!createPartOfSpeech) {
      throw new BadRequestError(`Error in creating part of speech. Try again later.`);
    }
  });

  res.status(StatusCodes.OK).json({ createWord });
};

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

module.exports = { addWord, getAllWords, getRandomWord };
