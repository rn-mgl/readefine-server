const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Words = require("../../../models/words/Words");
const WordDefinition = require("../../../models/words/WordDefinition");
const WordPartOfSpeech = require("../../../models/words/WordPartOfSpeech");
const StoryContent = require("../../../models/story/StoryContent");

const addWord = async (req, res) => {
  const { id } = req.user;
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

  const newWord = new Words(word, phonetic, id);
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

    const newDefinition = new WordDefinition(
      createWord.insertId,
      definition,
      example,
      id
    );
    const createDefinition = await newDefinition.addDefinition();

    if (!createDefinition) {
      throw new BadRequestError(
        `There was a problem in creating the definition.`
      );
    }

    const newPartOfSpeech = new WordPartOfSpeech(
      createDefinition.insertId,
      m.partOfSpeech,
      id
    );
    const createPartOfSpeech = await newPartOfSpeech.addPartOfSpeech();

    if (!createPartOfSpeech) {
      throw new BadRequestError(
        `There was a problem in creating the part of speech.`
      );
    }
  });

  res.status(StatusCodes.OK).json({ createWord });
};

const getAllWords = async (req, res) => {
  const image = await StoryContent.getImage();

  if (!image) {
    throw new BadRequestError(`There was a problem in getting all the words.`);
  }

  image.forEach(async (i) => {
    if (i.image && !i.image.includes("/readefine-uploads/")) {
      const splitted = i.image.split("/");
      splitted.splice(7, 0, "readefine-uploads");
      const newUrl = splitted.join("/");
      const update = await StoryContent.updateUrl(newUrl, i.content_id);
      console.log(update);
    }
  });

  res.status(StatusCodes.OK).json(image);
};

const getRandomWord = async (req, res) => {
  const word = await Words.getRandomWord();

  if (!word) {
    throw new BadRequestError(`There was a problem in getting a random word.`);
  }

  res.status(StatusCodes.OK).json(word);
};

module.exports = { addWord, getAllWords, getRandomWord };
