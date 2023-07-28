const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const StoryContent = require("../../../models/story/StoryContent");
const Story = require("../../../models/story/Story");

const getAllContent = async (req, res) => {
  const { storyId } = req.query;

  const ifExist = await Story.getStory(storyId);

  if (!ifExist) {
    throw new NotFoundError(`The story you are trying to view does not exist.`);
  }

  const storyContent = await StoryContent.getAllContent(storyId);

  if (!storyContent) {
    throw new BadRequestError(`There was a problem in getting all content of the story.`);
  }

  res.status(StatusCodes.OK).json(storyContent);
};

const getContent = async (req, res) => {
  const { content_id } = req.params;

  const storyContent = await StoryContent.getContent(content_id);

  if (!storyContent) {
    throw new NotFoundError(`The story content you are trying to view does not exist.`);
  }

  res.status(StatusCodes.OK).json(storyContent);
};

module.exports = { getAllContent, getContent };
