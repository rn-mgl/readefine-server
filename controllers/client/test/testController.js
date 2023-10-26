const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Test = require("../../../models/test/Test");

const getAllUserTests = async (req, res) => {
  const { id } = req.user;
  const { searchFilter, sortFilter, userLexile } = req.query;
  const test = await Test.getAllUserTests(id, searchFilter, sortFilter, userLexile);

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

module.exports = { getTest, getAllUserTests };
