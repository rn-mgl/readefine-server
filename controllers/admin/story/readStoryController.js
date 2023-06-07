const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const ReadStory = require("../../../models/story/ReadStory");

const createReadStory = async (req, res) => {
  const { id } = req.user;
  const { story_id } = req.params;

  const readStory = new ReadStory(id, story_id);

  const data = await readStory.createReadStory();

  if (!data) {
    throw new BadRequestError(`Error in adding story to read. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const getReadStories = async (req, res) => {
  const { userId } = req.query;

  const data = await ReadStory.getReadStories(userId);

  if (!data) {
    throw new BadRequestError(`Error in getting read stories. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { createReadStory, getReadStories };
