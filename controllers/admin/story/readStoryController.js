const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const ReadStory = require("../../../models/story/ReadStory");
const Story = require("../../../models/story/Story");
const User = require("../../../models/users/User");

const createReadStory = async (req, res) => {
  const { id } = req.user;
  const { story_id } = req.params;

  const ifExist = await Story.getStory(story_id);

  if (!ifExist) {
    throw new BadRequestError(`The book you are trying to add in your read record does not exist.`);
  }

  const readStory = new ReadStory(id, story_id);

  const data = await readStory.createReadStory();

  if (!data) {
    throw new BadRequestError(`There was a problem in adding the book to the read history.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getReadStories = async (req, res) => {
  const { userId, readMonth } = req.query;

  const ifExist = await User.getUser(userId);

  if (!ifExist) {
    throw new NotFoundError(`The user you are trying view does not exist.`);
  }

  const data = await ReadStory.getReadStories(userId, readMonth);

  if (!data) {
    throw new BadRequestError(`There was a problem in getting the read stories.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { createReadStory, getReadStories };
