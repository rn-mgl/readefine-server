const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../errors");
const StoryContent = require("../../../models/story/StoryContent");

const getAllContent = async (req, res) => {
  const { story_id } = req.body;

  const storyContent = await StoryContent.getAllContent(story_id);

  if (!storyContent) {
    throw new BadRequestError(`Error in getting all content. Try again later.`);
  }

  res.status(StatusCodes.OK).json(storyContent);
};

const getContent = async (req, res) => {
  const { content_id } = req.params;

  const storyContent = await StoryContent.getContent(content_id);

  if (!storyContent) {
    throw new BadRequestError(`Error in getting all content. Try again later.`);
  }

  res.status(StatusCodes.OK).json(storyContent);
};

module.exports = { getAllContent, getContent };
