const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Story = require("../../../models/story/Story");

const getAllStories = async (req, res) => {
  const { searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter } = req.query;
  const story = await Story.getAllStories(
    searchFilter,
    lexileRangeFilter,
    sortFilter,
    dateRangeFilter
  );

  if (!story) {
    throw new BadRequestError(`Error in getting all stories. Try again later.`);
  }

  res.status(StatusCodes.OK).json(story);
};

const getStory = async (req, res) => {
  const { story_id } = req.params;

  const story = await Story.getStory(story_id);

  if (!story) {
    throw new BadRequestError(`Error in getting story. Try again later.`);
  }

  res.status(StatusCodes.OK).json(story);
};

module.exports = { getAllStories, getStory };
