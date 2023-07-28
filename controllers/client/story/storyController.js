const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Story = require("../../../models/story/Story");

const getAllUserStories = async (req, res) => {
  const { id } = req.user;
  const { searchFilter, lexileRangeFilter, sortFilter } = req.query;
  const story = await Story.getAllUserStories(id, searchFilter, lexileRangeFilter, sortFilter);

  if (!story) {
    throw new BadRequestError(`There was a problem in getting all the stories.`);
  }

  res.status(StatusCodes.OK).json(story);
};

const getStory = async (req, res) => {
  const { story_id } = req.params;

  const story = await Story.getStory(story_id);

  if (!story) {
    throw new NotFoundError(`The story you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(story);
};

module.exports = { getAllUserStories, getStory };
