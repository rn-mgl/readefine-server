const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const TakenTest = require("../../../models/test/TakenTest");
const Test = require("../../../models/test/Test");
const AnsweredQuestion = require("../../../models/answers/AnsweredQuestion");
const UserLexile = require("../../../models/users/UserLexile");
const UserAchievement = require("../../../models/achievements/UserAchievement");

const takeTest = async (req, res) => {
  const { id } = req.user;
  const { selectedChoices, testId, score, legibleForGrowth, lexile } = req.body;

  const ifExist = await Test.getTest(testId);

  if (!ifExist) {
    throw new NotFoundError(`The test you are trying to take does not exist.`);
  }

  // record test
  const takenTest = new TakenTest(id, testId, score);

  const data = await takenTest.takeTest();

  if (!data) {
    throw new BadRequestError(`There was a problem in recording the test you took.`);
  }

  // record answers
  for (let i = 1; i <= 10; i++) {
    const { answer, questionId } = selectedChoices[`choice${i}`];

    const answerQuestion = new AnsweredQuestion(questionId, id, answer, data.insertId);

    const newAnswer = answerQuestion.createAnswer();

    if (!newAnswer) {
      throw new BadRequestError(`There was a problem in recording the answer ${answer}.`);
    }
  }

  // check if user took test within their lexile range
  if (legibleForGrowth) {
    const toAdd = Math.floor(score / 2);

    const userLexile = new UserLexile(id, lexile + toAdd);

    const newLexileRecord = userLexile.createLexile();

    if (!newLexileRecord) {
      throw new BadRequestError(`There was a problem in updating your Lexile level.`);
    }

    // return to add to make request in front end for user lexile points
    res.status(StatusCodes.OK).json({ toAdd });
    return;
  }

  res.status(StatusCodes.OK).json({ toAdd: 0 });
};

const getTakenTest = async (req, res) => {
  const { id } = req.user;
  const { testId } = req.query;

  const ifExist = await Test.getTest(testId);

  if (!ifExist) {
    throw new NotFoundError(`The test you are trying to view does not exist.`);
  }

  const takenTest = await TakenTest.getTakenTest(id, testId);

  if (!takenTest) {
    throw new BadRequestError(`There was a problem in viewing your taken test.`);
  }

  res.status(StatusCodes.OK).json(takenTest);
};

module.exports = { takeTest, getTakenTest };
