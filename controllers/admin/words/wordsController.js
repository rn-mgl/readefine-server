const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Words = require("../../../models/words/Words");
const WordDefinition = require("../../../models/words/WordDefinition");
const WordPartOfSpeech = require("../../../models/words/WordPartOfSpeech");
const StoryContent = require("../../../models/story/StoryContent");

const addWord = async (req, res) => {
  const { data } = req.body;
  const { word, phonetics, meanings } = data;

  const exists = await Words.getWord(word);

  if (exists) {
    throw new NotFoundError(`The word ${word} already exists.`);
  }

  let phonetic = "";

  for (let i = 0; i < phonetics.length; i++) {
    const p = phonetics[i];

    if (p.text) {
      phonetic = p.text;
      break;
    }
  }

  phonetic = phonetic ? phonetic : "---";

  const newWord = new Words(word, phonetic);
  const createWord = await newWord.addWord();

  if (!createWord) {
    throw new BadRequestError(`Error in creating word. Try again later.`);
  }

  meanings.map(async (m) => {
    let definition = "";
    let example = "";

    for (let j = 0; j < m.definitions?.length; j++) {
      const d = m.definitions[j];
      if (d.definition) {
        definition = d.definition;
        example = d.example ? d.example : null;
        break;
      }
    }

    const newDefinition = new WordDefinition(createWord.insertId, definition, example);
    const createDefinition = await newDefinition.addDefinition();

    if (!createDefinition) {
      throw new BadRequestError(`There was a problem in creating the definition.`);
    }

    const newPartOfSpeech = new WordPartOfSpeech(createDefinition.insertId, m.partOfSpeech);
    const createPartOfSpeech = await newPartOfSpeech.addPartOfSpeech();

    if (!createPartOfSpeech) {
      throw new BadRequestError(`There was a problem in creating the part of speech.`);
    }
  });

  res.status(StatusCodes.OK).json({ createWord });
};

const getAllWords = async (req, res) => {
  const word = await Words.getAllWords();

  if (!word) {
    throw new BadRequestError(`There was a problem in getting all the words.`);
  }

  res.status(StatusCodes.OK).json(word);
};

const getRandomWord = async (req, res) => {
  const word = await Words.getRandomWord();

  if (!word) {
    throw new BadRequestError(`There was a problem in getting a random word.`);
  }

  res.status(StatusCodes.OK).json(word);
};

module.exports = { addWord, getAllWords, getRandomWord };
