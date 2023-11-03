const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Test = require("../../../models/test/Test");
const TestQuestion = require("../../../models/test/TestQuestion");
const TestAnswer = require("../../../models/test/TestAnswer");
const Story = require("../../../models/story/Story");

const createTest = async (req, res) => {
  const { storyId, pages } = req.body;

  const ifExist = await Story.getStory(storyId);

  if (!ifExist) {
    throw new NotFoundError(`The story you are trying to add a test to does not exist.`);
  }

  const test = new Test(storyId);

  const data = await test.createTest();

  if (!data) {
    throw new BadRequestError(`There was a problem in creating the test.`);
  }

  pages.map(async (page, index) => {
    const questionContent = new TestQuestion(data.insertId, page.testQuestion);

    const newQuestion = await questionContent.createQuestion();

    if (!newQuestion) {
      throw new BadRequestError(`There was a problem in creating the test question.`);
    }

    const answerIdentifier = `answer${index + 1}`;

    const answer = page[answerIdentifier];

    const answerContent = new TestAnswer(
      newQuestion.insertId,
      answer,
      page.choice1,
      page.choice2,
      page.choice3,
      page.choice4
    );

    const newAnswer = await answerContent.createAnswer();

    if (!newAnswer) {
      throw new BadRequestError(`There was a problem in creating the test answer.`);
    }
  });

  res.status(StatusCodes.OK).json(data);
};

const getAllTests = async (req, res) => {
  const { searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter } = req.query;
  const test = await Test.getAllTests(searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter);

  if (!test) {
    throw new BadRequestError(`There was a problem in getting all tests.`);
  }

  res.status(StatusCodes.OK).json(test);
};

const getTest = async (req, res) => {
  const { test_id } = req.params;
  const test = await Test.getTest(test_id);

  if (!test) {
    throw new NotFoundError(`The test you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(test);
};

const deleteTest = async (req, res) => {
  const { test_id } = req.params;

  const ifExist = await Test.getTest(test_id);

  if (!ifExist) {
    throw new NotFoundError(`The test you are trying to delete does not exist.`);
  }

  const test = await Test.deleteTest(test_id);

  if (!test) {
    throw new BadRequestError(`Error in deleting test. Try again later.`);
  }

  res.status(StatusCodes.OK).json(test);
};

const updateTest = async (req, res) => {
  const { questions, testId } = req.body;

  const ifExist = await Test.getTest(testId);

  if (!ifExist) {
    throw new NotFoundError(`The test you are trying to update does not exist.`);
  }

  questions.map(async (q) => {
    const ifQuestionExist = await TestQuestion.getQuestion(q.question_id);

    if (!ifQuestionExist) {
      throw new NotFoundError(`The test question you are trying to update does not exist.`);
    }

    const question = await TestQuestion.updateQuestion(q.question_id, q.question);

    if (!question) {
      throw new BadRequestError(`There was a problem in updating the test question.`);
    }

    const ifAnswerExist = await TestAnswer.getAnswer(q.answer_id);

    if (!ifAnswerExist) {
      throw new NotFoundError(`The test answer you are trying to update does not exist.`);
    }

    const answerIdentifier = `answer${q.question_id}`;

    const answer = q[answerIdentifier];

    const newAnswer = await TestAnswer.updateAnswer(
      q.answer_id,
      answer,
      q.choice_1,
      q.choice_2,
      q.choice_3,
      q.choice_4
    );

    if (!newAnswer) {
      throw new BadRequestError(`There was a problem in updating the test answer.`);
    }
  });

  res.status(StatusCodes.OK).json({ msg: "successful" });
};

module.exports = { createTest, getAllTests, getTest, deleteTest, updateTest };
