const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../../errors");
const Test = require("../../../models/test/Test");
const TestQuestion = require("../../../models/test/TestQuestion");
const TestAnswer = require("../../../models/test/TestAnswer");

const createTest = async (req, res) => {
  const { storyId, pages } = req.body;
  const { id } = req.user;

  const test = new Test(storyId, id);

  const data = await test.createTest();

  if (!data) {
    throw new BadRequestError(`Error in creating test. Try again later.`);
  }

  pages.map(async (page, index) => {
    const questionContent = new TestQuestion(data.insertId, page.testQuestion, id);

    const newQuestion = await questionContent.createQuestion();

    if (!newQuestion) {
      throw new BadRequestError(`Error in creating question. Try again later.`);
    }

    const answerIdentifier = `answer${index + 1}`;

    const answer = page[answerIdentifier];

    const answerContent = new TestAnswer(
      newQuestion.insertId,
      answer,
      page.choice1,
      page.choice2,
      page.choice3,
      page.choice4,
      id
    );

    const newAnswer = await answerContent.createAnswer();

    if (!newAnswer) {
      throw new BadRequestError(`Error in creating answer. Try again later.`);
    }
  });

  res.status(StatusCodes.OK).json(data);
};

const getAllTests = async (req, res) => {
  const { searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter } = req.query;
  const test = await Test.getAllTests(searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter);

  if (!test) {
    throw new BadRequestError(`Error in getting all tests. Try again later.`);
  }

  res.status(StatusCodes.OK).json(test);
};

const getTest = async (req, res) => {
  const { test_id } = req.params;
  const test = await Test.getTest(test_id);

  if (!test) {
    throw new BadRequestError(`Error in getting test. Try again later.`);
  }

  res.status(StatusCodes.OK).json(test);
};

const deleteTest = async (req, res) => {
  const { test_id } = req.params;

  const test = await Test.deleteTest(test_id);

  if (!test) {
    throw new BadRequestError(`Error in deleting test. Try again later.`);
  }

  res.status(StatusCodes.OK).json(test);
};

const updateTest = async (req, res) => {
  const { questions } = req.body;
  const { id } = req.user;

  questions.map(async (q) => {
    const question = await TestQuestion.updateQuestion(q.question_id, q.question, id);

    if (!question) {
      throw new BadRequestError(`Error in updating question. Try again later.`);
    }

    const answerIdentifier = `answer${q.question_id}`;

    const answer = q[answerIdentifier];

    const newAnswer = await TestAnswer.updateAnswer(
      q.answer_id,
      answer,
      q.choice_1,
      q.choice_2,
      q.choice_3,
      q.choice_4,
      id
    );

    if (!newAnswer) {
      throw new BadRequestError(`Error in updating answer. Try again later.`);
    }
  });

  res.status(StatusCodes.OK).json({ msg: "successful" });
};

module.exports = { createTest, getAllTests, getTest, deleteTest, updateTest };
