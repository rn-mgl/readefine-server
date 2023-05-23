const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const Story = require("../../../models/story/Story");

const createStory = async (req, res) => {
  const { title, author, lexile, genre } = req.body;
  const { id } = req.user;

  const story = new Story(title, author, lexile, genre, id);

  const data = await story.createStory();

  if (!data) {
    throw new BadRequestError(`Error in creating story. Try again later.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const updateStory = async (req, res) => {
  const { title, author, lexile, genre } = req.body;
  const { story_id } = req.params;
  const { id } = req.user;

  const story = await Story.updateStory(story_id, title, author, lexile, genre, id);

  if (!story) {
    throw new BadRequestError(`Error in updating story. Try again later.`);
  }

  res.status(StatusCodes.OK).json(story);
};

const deleteStory = async (req, res) => {
  const { story_id } = req.params;

  const story = await Story.deleteStory(story_id);

  if (!story) {
    throw new BadRequestError(`Error in deleting story. Try again later.`);
  }

  res.status(StatusCodes.OK).json(story);
};

const getAllStories = async (req, res) => {
  const { searchFilter, lexileRangeFilter, sortFilter, dateRangeFilter } = req.query;
  console.log(req.query);
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

module.exports = { createStory, updateStory, deleteStory, getAllStories, getStory };
